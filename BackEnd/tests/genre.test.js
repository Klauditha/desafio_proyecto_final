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
})