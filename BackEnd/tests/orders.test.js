const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Orders API Routes', () => {
  describe('POST /orders/createbyuser/:user_id', () => {
    it('Crear orden basado en carrito del usuario', async () => {
      const email = 'user3@example.com';
      const password = 'password3';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const user_id = 1;
      const response = await request(app)
        .post('/orders/createbyuser/' + user_id)
        .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Orden creada');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('GET /orders/all/:user_id', () => {
    it('Obtener todas de un usuario', async () => {
      const email = 'user3@example.com';
      const password = 'password3';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const user_id = 1;
      const response = await request(app)
        .get('/orders/all/' + user_id)
        .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Ordenes encontradas');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('GET /orders/detail/:order_id', () => {
    it('Obtener detalle de una orden', async () => {
      const email = 'user3@example.com';
      const password = 'password3';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const order_id = 41;
      const response = await request(app)
        .get('/orders/detail/' + order_id)
        .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Detalle orden encontrado');
      expect(response.body.data).not.toBe(null);
    });
  });
});
