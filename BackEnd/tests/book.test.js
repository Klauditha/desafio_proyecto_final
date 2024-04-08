const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Book API Routes', () => {
  describe('GET /book/:book_id', () => {
    it('Obtener libro por id correctamente', async () => {
      const book_id = 4;
      const user_id = 0;
      const response = await request(app).get('/book/' + book_id + '&' + user_id);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
    it('Obtener libro por id correctamente con wishlist del usuario', async () => {
      const book_id = 9;
      const user_id=3
      const response = await request(app).get('/book/' + book_id + '&' + user_id);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
    it('Obtener libro por id fallido, no existe', async () => {
      const book_id = 1000;
      const user_id = 0;
      const response = await request(app).get('/book/' + book_id + '&' + user_id);
      expect(response.status).toBe(404);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe('Libro no encontrado');
      expect(response.body.data).toBe(null);
    });
  });

  describe('POST /book/allPublishers', () => {
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

  describe('POST /book/bypublisher', () => {
    it('Obtener libros por editorial correctamente', async () => {
      const publisher = 'Alianza';
      const response = await request(app)
        .post('/book/bypublisher')
        .send({ publisher });
      //console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe(
        'Libros encontrados para la editorial'
      );
      expect(response.body.data).not.toBe(null);
    });
    
    it('Obtener libros por editorial que no existe', async () => {
        const publisher = 'Cualquiera';
        const response = await request(app)
          .post('/book/bypublisher')
          .send({ publisher });
        expect(response.status).toBe(404);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe(
          'No existen libros para la editorial'
        );
        expect(response.body.data).toBe(null);
      });
  });

  describe('POST /book/moresold', () => {
    it('Obtener todos los libros más vendidos correctamente', async () => {
      const response = await request(app).post('/book/moresold');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('POST /book/all', () => {
    it('Obtener todos los libros correctamente', async () => {
      const response = await request(app).post('/book/all');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.data).not.toBe(null);
    });
  });
});
