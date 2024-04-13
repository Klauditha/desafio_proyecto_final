const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Author API Routes', () => {
    describe('POST /author/all', () => {
      it('Obtener autores correctamente', async () => {
        const response = await request(app).post('/author/all');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Autores encontrados');
        expect(response.body.data).not.toBe(null);
      });
    });
    describe('POST /author/allActive', () => {
      it('Obtener autores activos correctamente', async () => {
        const response = await request(app).post('/author/allActive');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Autores activos encontrados');
        expect(response.body.data).not.toBe(null);
      });
    });
  
    describe('DELETE /author/{author_id}', () => {
      it('Desactivar autor correctamente', async () => {
        const author_id = 5;
        const email = 'user4@example.com';
        const password = 'password4';
        const responseToken = await request(app)
          .post('/login')
          .send({ email, password });
        const token = responseToken.body.data.token;
        const response = await request(app).delete('/author/' + author_id)
        .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Autor desactivado');
        expect(response.body.data).not.toBe(null);
      });
    });
  
    describe('PUT /author/activate/{author_id}', () => {
      it('Activar autor correctamente', async () => {
        const author_id = 2;
        const email = 'user4@example.com';
        const password = 'password4';
        const responseToken = await request(app)
          .post('/login')
          .send({ email, password });
        const token = responseToken.body.data.token;
        const response = await request(app).put('/author/activate/' + author_id)
        .set('Authorization', 'bearer ' + token);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Autor activado');
        expect(response.body.data).not.toBe(null);
      });
    });
  });
  