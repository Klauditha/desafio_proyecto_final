const request = require('supertest');
const app = require('../app');
require('dotenv').config();

describe('Book API Routes', () => {
  describe('GET /book/:book_id', () => {
    it('Obtener libro por id correctamente', async () => {
      const book_id = 4;
      const user_id = 0;
      const response = await request(app).get(
        '/book/' + book_id + '&' + user_id
      );
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
    it('Obtener libro por id correctamente con wishlist del usuario', async () => {
      const book_id = 9;
      const user_id = 3;
      const response = await request(app).get(
        '/book/' + book_id + '&' + user_id
      );
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro encontrado');
      expect(response.body.data).not.toBe(null);
    });
    it('Obtener libro por id fallido, no existe', async () => {
      const book_id = 1000;
      const user_id = 0;
      const response = await request(app).get(
        '/book/' + book_id + '&' + user_id
      );
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
      expect(response.body.message).toBe('No existen libros para la editorial');
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

  describe('POST /book/', () => {
    it('Agregar nuevo libro', async () => {
      /*Datos de libro , modificar los datos si es necesario*/
      const isbn = '9789566184638';
      const title = 'Terapia Para Llevar';
      const description =
        'Salud mental, gestión emocional… palabras de moda que no paramos de escuchar pero, ¿qué significan? y, sobre todo, ¿cómo podemos trabajar en ellos? Nací Dramática pone en tus manos 20 conceptos clave de la psicología y 100 herramientas prácticas para llevar mejor el día a día. Aprende a relativizar, a evitar los pensamientos dicotómicos, a gestionar el fracaso y el miedo y, en general, a entender tus emociones. Todo con un tono cercano, práctico y útil lleno de humor, dibujos y gráficos con la estética pop y llamativa característica';
      const language = 'Espanol';
      const pages = 224;
      const publisher = 'Montena';
      const pub_date = '2024-03-01';
      const price = 14450;
      const stock = 10;
      const genre = 'Autoayuda';
      const author = 'Ana Perez';
      /*Datos usuario admin*/
      const email = 'user4@example.com';
      const password = 'password4';
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const response = await request(app)
        .post('/book/')
        .set('Authorization', 'bearer ' + token)
        .send({
          isbn,
          title,
          description,
          language,
          pages,
          publisher,
          pub_date,
          price,
          stock,
          genre,
          author,
        });
      expect(response.status).toBe(201);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro agregado');
      expect(response.body.data).not.toBe(null);
    });
  });

  describe('PUT /book/:book_id', () => {
    it('Editar libro correctamente', async () => {
      const book_id = 22;
      /*Datos usuario admin*/
      const email = 'user4@example.com';
      const password = 'password4';
      /*Datos libro a modificar*/
      const isbn = '5665565';
      const title = 'Titulo de prueba de edicion2';
      const description = 'Descripcion de prueba de edicion';
      const language = 'Espanol';
      const pages = 100;
      const publisher = 'Montena';
      const pub_date = '2024-03-01';
      const price = 14450;
      const stock = 10;
      const genre_id = 1;
      const author_id = 1;
      const responseToken = await request(app)
        .post('/login')
        .send({ email, password });
      const token = responseToken.body.data.token;
      const response = await request(app)
        .put('/book/' + book_id)
        .set('Authorization', 'bearer ' + token)
        .send({
          isbn,
          title,
          description,
          language,
          pages,
          publisher,
          pub_date,
          price,
          stock,
          genre_id,
          author_id,
        });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe(true);
      expect(response.body.message).toBe('Libro actualizado correctamente');
      expect(response.body.data).not.toBe(null);
    });
  });
});
