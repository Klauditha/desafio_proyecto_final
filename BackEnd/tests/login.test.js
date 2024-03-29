const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Login API Routes', () => {
  describe('POST /login', () => {
    it('Login correcto', async () => {
      const email = 'user4@example.com';
      const password = 'password4';
      const response = await request(app)
        .post('/login')
        .send({ email, password });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Usuario autenticado exitosamente');
      expect(response.body.data.token).not.toBe(null);
    });

    it('Login credenciales incorrectas', async () => {
      const email = 'user4@example.com';
      const password = 'password5';
      const response = await request(app)
        .post('/login')
        .send({ email, password });
      expect(response.status).toBe(401);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe('Credenciales inválidas.');
      expect(response.body.data).toBe(null);
    });

    it('Login usuario inexistente', async () => {
      const email = 'usernoexiste@example.com';
      const password = 'password5';
      const response = await request(app)
        .post('/login')
        .send({ email, password });
      expect(response.status).toBe(401);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe('Usuario no encontrado.');
      expect(response.body.data).toBe(null);
    });
  });
});
