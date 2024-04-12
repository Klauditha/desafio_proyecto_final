const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Genre API Routes', () => {
  describe('POST /genre/all', () => {
    it('Obtener generos correctamente', async () => {
      const response = await request(app).post('/genre/all');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Generos encontrados');
      expect(response.body.data).not.toBe(null);
    });
  });
  describe('POST /genre/allActive', () => {
    it('Obtener generos activos correctamente', async () => {
      const response = await request(app).post('/genre/allActive');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Generos activos encontrados');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('DELETE /genre/{genre_id}', () => {
    it('Desactivar genero correctamente', async () => {
      const genre_id = 1;
      const email = 'user4@example.com';
      const password = 'password4';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const response = await request(app).delete('/genre/' + genre_id)
      .set('Authorization', 'bearer ' + token);
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Genero desactivado');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('PUT /genre/activate/{genre_id}', () => {
    it('Activar genero correctamente', async () => {
      const genre_id = 2;
      const email = 'user4@example.com';
      const password = 'password4';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const response = await request(app).put('/genre/activate/' + genre_id)
      .set('Authorization', 'bearer ' + token);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Genero activado');
      expect(response.body.data).not.toBe(null);
    });
  });
});
