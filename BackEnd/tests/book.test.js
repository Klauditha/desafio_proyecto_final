const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Login API Routes', () => {    
    describe('GET /book/:book_id', () => {
        it('Obtener libro por id correctamente', async () => {
            const book_id = 1;
            const response = await request(app)
                .get('/book/' + book_id);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe(true);
            expect(response.body.message).toBe('Libro encontrado');
            expect(response.body.data).not.toBe(null);
        });
        it('Obtener libro por id fallido, no existe', async () => {
            const book_id = 1000;
            const response = await request(app)
                .get('/book/' + book_id);
            expect(response.status).toBe(404);
            expect(response.body.status).toBe(false);
            expect(response.body.message).toBe('Libro no encontrado');
            expect(response.body.data).toBe(null);
        });
    });
})