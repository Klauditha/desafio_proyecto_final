const { createUserSchema, userSchema } = require('../schemas/user.schema');
const boom = require('@hapi/boom');
const { pool } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
  constructor() {
    this.users = [];
  }

  static async create(data) {
    try {
      const validatedData = await createUserSchema.validateAsync(data, {
        abortEarly: false,
      });
      const { email, password } = validatedData;
      const hashedPassword = await bcrypt.hash(password, 10);
      validatedData.admin = false;

      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [validatedData.email]
      );
      if (existingUser.rows.length > 0) {
        throw boom.conflict('Usuario ya existe');
      }

      const newUser = {
        ...validatedData,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted: false,
      };

      const client = await pool.connect();
      try {
        const maxUserIdQuery = await client.query(
          'SELECT MAX(user_id) AS max_id FROM users'
        );
        const maxUserId = maxUserIdQuery.rows[0].max_id;

        const nextUserId = maxUserId ? maxUserId + 1 : 1;

        const validatedData = await createUserSchema.validateAsync(data, {
          abortEarly: false,
        });

        validatedData.user_id = nextUserId;

        const query = `
          INSERT INTO users (username, password, email, first_name, last_name, phone, region, admin, country, city, district, address, zip_code, created_at, updated_at, deleted)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          RETURNING *
          `;

        const result = await client.query(query, [
          //validatedData.user_id,
          newUser.username,
          newUser.password,
          newUser.email,
          newUser.first_name,
          newUser.last_name,
          newUser.phone,
          newUser.region,
          newUser.admin,
          newUser.country,
          newUser.city,
          newUser.district,
          newUser.address,
          newUser.zip_code,
          newUser.created_at,
          newUser.updated_at,
          newUser.deleted,
        ]);
        const insertedUser = result.rows[0];
        return insertedUser;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Error creando usuario:', error.message);
      throw error;
    }
  }

  static async findOne(user_id) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const result = await client.query(query, [user_id]);
      const user = result.rows[0];

      if (!user) {
        throw boom.notFound('Usuario no encontrado');
      }

      return user;
    } finally {
      client.release();
    }
  }

  static async authenticateUser(email, password) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      const user = result.rows[0];

      if (!user) {
        throw boom.unauthorized('Usuario no encontrado.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw boom.unauthorized('Credenciales inválidas.');
      }

      return user;
    } finally {
      client.release();
    }
  }

  static async generateToken(user_id, expiredIn) {
    const payload = {
      user_id: user_id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiredIn,
    });
    return token;
  }

  static async deleteUser(user_id) {
    const client = await pool.connect();
    try {
      const query = 'UPDATE users SET deleted = true WHERE user_id = $1';
      await client.query(query, [user_id]);
    } finally {
      client.release();
    }
  }

  async findById(user_id) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const result = await client.query(query, [user_id]);
      const user = result.rows[0];
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
    } finally {
      client.release();
    }
  }

  static async  findByUsername(username) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [username]);
      const user = result.rows[0];
      if (!user) {
        throw boom.notFound('User not found');
      }
      return user;
    } finally {
      client.release();
    }
  }

  async findAll() {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users';
      const result = await client.query(query);
      const user = result.rows;
      if (!user) {
        throw boom.notFound('User not found');
      }

      return user;
    } finally {
      client.release();
    }
  }

  static async updateUser(user_id, newData) {
    newData.admin = false; // Desactivar para permitir cambiar estado admin de usuario
    newData.password = await bcrypt.hash(newData.password, 10);
    const client = await pool.connect();
    try {
      const query = `
      UPDATE users
      SET 
        username = COALESCE($2, username),
        password = COALESCE($3, password),
        email = COALESCE($4, email),
        first_name = COALESCE($5, first_name),
        last_name = COALESCE($6, last_name),
        phone = COALESCE($7, phone),
        region = COALESCE($8, region),
        country = COALESCE($9, country),
        city = COALESCE($10, city),
        district = COALESCE($11, district),
        address = COALESCE($12, address),
        zip_code = COALESCE($13, zip_code),
        updated_at = $14
      WHERE user_id = $1
      RETURNING *
    `;

      const result = await client.query(query, [
        user_id,
        newData.username,
        newData.password,
        newData.email,
        newData.first_name,
        newData.last_name,
        newData.phone,
        newData.region,
        newData.country,
        newData.city,
        newData.district,
        newData.address,
        newData.zip_code,
        new Date().toISOString(),
      ]);

      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

module.exports = UserService;
