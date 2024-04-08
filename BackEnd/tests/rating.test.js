const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Rating API Routes', () => {
  describe('GET /rating/:book_id', () => {
    it('Obtener rating por idbook correctamente', async () => {
      const book_id = 16;
      const response = await request(app).get('/rating/' + book_id);
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Rating de libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
   
  });
});
