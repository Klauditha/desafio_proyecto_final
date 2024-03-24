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
      console.log('Data recibida para creacion de usuario:', data);

      const validatedData = await createUserSchema.validateAsync(data, {
        abortEarly: false,
      });
      console.log('Validated data:', validatedData);
      const { email, password } = validatedData;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hash exitoso');
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
      console.log('Nuevo objeto de usuario construido:', newUser);

      console.log('Data de nuevo usuario:', newUser);
      const client = await pool.connect();
      try {
        const maxUserIdQuery = await client.query(
          'SELECT MAX(user_id) FROM users'
        );
        const maxUserId = maxUserIdQuery.rows[0].max;

        const nextUserId = maxUserId ? maxUserId + 1 : 1;
        console.log('nextUserId:', nextUserId);

        const validatedData = await createUserSchema.validateAsync(data, {
          abortEarly: false,
        });

        validatedData.user_id = nextUserId;

        const query = `
            INSERT INTO users (user_id, username, password, email, first_name, last_name, phone, region, admin, country, city, district, address, zip_code, created_at, updated_at, deleted)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          RETURNING *`;

        const result = await client.query(query, [
          nextUserId,
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
        console.log('Usuario creado exitosamente:', insertedUser);
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
        throw boom.notFound('Usuario no encontrado.');
      }

      return user;
    } finally {
      client.release();
    }
  }

  /* static async findOne(email) {
    const client = await pool.connect();
    try {
      const query = "SELECT * FROM users WHERE email = $1";
      const result = await client.query(query, [email]);
      const user = result.rows[0];

      if (!user) {
        throw boom.notFound("Usuario no encontrado.");
      }

      return user;
    } finally {
      client.release();
    }
  } */

  static async authenticateUser(email, password) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      const user = result.rows[0];

      if (!user) {
        throw boom.unauthorized('Usuario no encontrado.');
      }

      console.log('Usuario traido:', user);
      console.log('Hashed password de la bdd:', user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(
        'Password input:',
        password,
        'Hashed password de la bdd:',
        user.password,
        'Password comparacion:',
        isPasswordValid
      );
      if (!isPasswordValid) {
        throw boom.unauthorized('Contraseña incorrecta.');
      }

      return user;
    } finally {
      client.release();
    }
  }

  static async generateToken(user_id, expiredIn) {
    console.log('user_id generateToken:', user_id);
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
}

module.exports = UserService;
