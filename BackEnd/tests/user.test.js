const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUserSchema, userSchema } = require("../schemas/user.schema");
const { authMiddleware } = require("../middlewares/auth.handler");

describe("User API Routes", () => {
  describe("GET /user/:user_id", () => {
    it("debe retornar detalles del usuario cuando se prove un ID de usuario valido", async () => {
      const user_id = 1;
      const token = await UserService.generateToken(user_id, "1d");
      const response = await request(app)
        .get(`/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("debe retornar 404 cuando se provee un ID de usuario invalido", async () => {
      const user_id = 999;
      const token = await UserService.generateToken(user_id, "1d");
      const response = await request(app)
        .get(`/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`);
    });
  });

  describe("PUT /user/:user_id", () => {
    it("debe actualizar un usuario cuando se hace solicitud con data valida", async () => {
      const user_id = 10; // Poner el user_id de un usuario valido
      const token = await UserService.generateToken(user_id, "1d");

      const updatedUserData = {
        username: "user10upd",
        password: "testpassword",
        email: "user10upd@example.com",
        first_name: "user10upd",
        last_name: "user10upd",
        phone: "+1234567890",
        region: "Region",
        country: "Country",
        city: "City",
        district: "District",
        address: "123 Main St",
        zip_code: "12345",
      };

      const response = await request(app)
        .put(`/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUserData);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Usuario actualizado exitosamente.");
      expect(response.body.data.user).toMatchObject(updatedUserData);
    });
  });

  describe("POST /user", () => {
    it("debe crear un nuevo usuario cuando se le provee información valida", async () => {
      // UserService.enableLogging = true;
      const timestamp = Date.now();
      const baseUsername = "usertest";
      const baseEmail = "usertest";
      
      const userData = {
        username: `${baseUsername}_${timestamp}`,
        password: "testpassword",
        email: `${baseEmail}_${timestamp}@example.com`,
        first_name: "pruebas",
        last_name: "Pruebas",
        phone: "+1234567890",
        region: "Region",
        admin: false,
        country: "Country",
        city: "City",
        district: "District",
        address: "123 Main St",
        zip_code: "12345",
      };

      const validatedData = await createUserSchema.validateAsync(userData);

      const response = await request(app).post("/user").send(validatedData);

      expect(response.status).toBe(201);

      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Nuevo usuario creado");

      const isPasswordValid = await bcrypt.compare(
        userData.password,
        response.body.data.user.password
      );
      expect(isPasswordValid).toBe(true);

      expect(response.body.data.user).toEqual({
        ...userData,
        password: response.body.data.user.password,
        created_at: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        ),
        updated_at: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        ),
        deleted: false,
        user_id: expect.any(Number),
      });
    });
  });

  describe("DELETE /user/:user_id", () => { //se deben ingresar datos validos en los campos comentados ↓↓
    it("debe borrar un usuario cuando lo solicita un admin", async () => {
      const user_id = 25; //poner el user_id de un usuario existente a borrar para el test
      const adminUser = {
        user_id: 4, //poner el user_id de un usuario que sea admin = true.
      };

      const adminToken = await UserService.generateToken(
        adminUser.user_id,
        "1d"
      );
      const response = await request(app)
        .delete(`/user/${user_id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe("Usuario borrado correctamente");
      expect(response.body.data).toBe(null);
    });

    it("debe retornar 403 si se hace el request por un usuario que no es admin", async () => {
      const user_id = 24; //poner el user_id de un usuario existente a borrar
      const nonAdminUser = {
        user_id: 10, //poner el user_id de un usuario que sea admin = false.
      };

      const token = await UserService.generateToken(nonAdminUser.user_id, "1d");

      const response = await request(app)
        .delete(`/user/${user_id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(403);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe(
        "Forbidden. Solo admin puede borrar usuarios."
      );
      expect(response.body.data).toBe(null);
    });
  });
});
