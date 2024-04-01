const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Book API Routes', () => {
  describe('GET /book/:book_id', () => {
    it('Obtener libro por id correctamente', async () => {
      const book_id = 1;
      const response = await request(app).get('/book/' + book_id);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
    it('Obtener libro por id fallido, no existe', async () => {
      const book_id = 1000;
      const response = await request(app).get('/book/' + book_id);
      expect(response.status).toBe(404);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe('Libro no encontrado');
      expect(response.body.data).toBe(null);
    });
  });

  describe('POST /book/byPublisher', () => {
    it('Obtener editoriales correctamente', async () => {
      const response = await request(app).post('/book/allPublishers');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Editoriales encontradas');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('POST /book/news', () => {
    it('Obtener novedades correctamente', async () => {
      const response = await request(app).post('/book/news');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libros encontrados');
      expect(response.body.data).not.toBe(null);
    });
  });
});
