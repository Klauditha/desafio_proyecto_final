-- Creacion de database

CREATE DATABASE TintaAustral;

-- Creacion de tablas

CREATE TABLE "users" (
    "user_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "username" VARCHAR(60) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(60) NOT NULL,
    "last_name" VARCHAR(60) NOT NULL,
    "phone" VARCHAR(32) NOT NULL,
    "region" VARCHAR(32) NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "country" VARCHAR(60) NOT NULL,
    "city" VARCHAR(60) NOT NULL,
    "district" VARCHAR(60) NOT NULL,
    "address" VARCHAR(60) NOT NULL,
    "zip_code" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

CREATE TABLE "books"(
    "book_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "isbn" BIGINT NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "language" VARCHAR(32) NOT NULL,
    "pages" INTEGER NOT NULL,
    "publisher" VARCHAR(60) NOT NULL,
    "pub_date" DATE NOT NULL,
    "price" BIGINT NOT NULL,
    "stock" BIGINT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

CREATE TABLE "order_items"(
    "order_item_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "order_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

COMMENT ON COLUMN "order_items"."order_id" IS 'FK';
COMMENT ON COLUMN "order_items"."book_id" IS 'FK';

CREATE TABLE "cart_items"(
    "cart_item_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

COMMENT ON COLUMN "cart_items"."user_id" IS 'FK';
COMMENT ON COLUMN "cart_items"."book_id" IS 'FK';

CREATE TABLE "authors"(
    "author_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "name" VARCHAR(64) NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

CREATE TABLE "ratings"(
    "rating_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" VARCHAR(5000) NOT NULL,
    "wishlist" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

COMMENT ON COLUMN "ratings"."user_id" IS 'FK';
COMMENT ON COLUMN "ratings"."book_id" IS 'FK';

CREATE TABLE "orders"(
    "order_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "user_id" INTEGER NOT NULL,
    "order_date" DATE NOT NULL,
    "total_amount" BIGINT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

COMMENT ON COLUMN "orders"."user_id" IS 'FK';

CREATE TABLE "books_genres"(
    "bookgenre_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
	"book_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL
);

COMMENT ON COLUMN "books_genres"."book_id" IS 'FK';
COMMENT ON COLUMN "books_genres"."genre_id" IS 'FK';

CREATE TABLE "books_authors"(
    "bookauthor_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "book_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL
);

COMMENT ON COLUMN "books_authors"."book_id" IS 'FK';
COMMENT ON COLUMN "books_authors"."author_id" IS 'FK';

CREATE TABLE "genres"(
    "genre_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    "name" VARCHAR(32) NOT NULL,
    "deleted" BOOLEAN NOT NULL
);

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("book_id");
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "orders"("order_id");
ALTER TABLE "books_genres" ADD CONSTRAINT "books_genres_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("book_id");
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_author_id_foreign" FOREIGN KEY("author_id") REFERENCES "authors"("author_id");
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("book_id");
ALTER TABLE "books_genres" ADD CONSTRAINT "books_genres_genre_id_foreign" FOREIGN KEY("genre_id") REFERENCES "genres"("genre_id");
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("book_id");
ALTER TABLE "books_authors" ADD CONSTRAINT "books_authors_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("book_id");
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("user_id");

	
--DATOS PARA TABLAS
-- En la mayoria de las tablas, la entrada con su respectivo PK id 13 tiene deleted true.
	
-- tabla users
INSERT INTO users (username, password, email, first_name, last_name, phone, region, admin, country, city, district, address, zip_code, created_at, updated_at, deleted) VALUES
('user3', 'password3', 'user3@example.com', 'Pedro', 'González', '+56911111111', 'Valparaíso', false, 'Chile', 'Viña del Mar', 'Reñaca', 'Av. Libertad 123', '2500000', '2023-03-17 12:00:00', '2023-03-17 12:00:00', false),
('user4', 'password4', 'user4@example.com', 'Ana', 'Martínez', '+56922222222', 'Biobío', true, 'Chile', 'Concepción', 'Centro', 'Calle Tucapel 456', '4030000', '2023-03-18 13:00:00', '2023-03-18 13:00:00', false),
('user5', 'password5', 'user5@example.com', 'Marcela', 'López', '+56933333333', 'Araucanía', false, 'Chile', 'Temuco', 'Centro', 'Av. Alemania 789', '4780000', '2023-03-19 14:00:00', '2023-03-19 14:00:00', false),
('user6', 'password6', 'user6@example.com', 'Diego', 'Ramírez', '+56944444444', 'Magallanes', false, 'Chile', 'Punta Arenas', 'Centro', 'Av. España 567', '6200000', '2023-03-20 15:00:00', '2023-03-20 15:00:00', false),
('user7', 'password7', 'user7@example.com', 'Camila', 'Hernández', '+56955555555', 'Antofagasta', false, 'Chile', 'Antofagasta', 'Norte', 'Av. Angamos 123', '1240000', '2023-03-21 16:00:00', '2023-03-21 16:00:00', false),
('user8', 'password8', 'user8@example.com', 'Manuel', 'Torres', '+56966666666', 'O''Higgins', false, 'Chile', 'Rancagua', 'Sur', 'Av. Libertador Bernardo O''Higgins 456', '2820000', '2023-03-22 17:00:00', '2023-03-22 17:00:00', false),
('user9', 'password9', 'user9@example.com', 'Luis', 'García', '+56977777777', 'Atacama', false, 'Chile', 'Copiapó', 'Norte', 'Calle Atacama 123', '1530000', '2023-03-23 18:00:00', '2023-03-23 18:00:00', false),
('user10', 'password10', 'user10@example.com', 'Carolina', 'Díaz', '+56988888888', 'Los Lagos', false, 'Chile', 'Puerto Montt', 'Centro', 'Av. Los Lagos 456', '5470000', '2023-03-24 19:00:00', '2023-03-24 19:00:00', false),
('user11', 'password11', 'user11@example.com', 'Javier', 'Sánchez', '+56999999999', 'Tarapacá', false, 'Chile', 'Iquique', 'Norte', 'Av. Tarapacá 789', '1420000', '2023-03-25 20:00:00', '2023-03-25 20:00:00', false),
('user12', 'password12', 'user12@example.com', 'Martina', 'Rodríguez', '+56910101010', 'Los Ríos', false, 'Chile', 'Valdivia', 'Centro', 'Calle Los Ríos 123', '5090000', '2023-03-26 21:00:00', '2023-03-26 21:00:00', false),
('user13', 'password13', 'user13@example.com', 'Andrés', 'Gómez', '+56920202020', 'Ñuble', false, 'Chile', 'Chillán', 'Centro', 'Av. Ñuble 456', '3820000', '2023-03-27 22:00:00', '2023-03-27 22:00:00', true),
('user14', 'password14', 'user14@example.com', 'Valentina', 'Muñoz', '+56930303030', 'Arica y Parinacota', false, 'Chile', 'Arica', 'Norte', 'Av. Arica 123', '1000000', '2023-03-28 23:00:00', '2023-03-28 23:00:00', false),
('user15', 'password15', 'user15@example.com', 'Diego', 'Herrera', '+56940404040', 'Magallanes', false, 'Chile', 'Puerto Natales', 'Centro', 'Av. Magallanes 789', '6160000', '2023-03-29 00:00:00', '2023-03-29 00:00:00', false);


-- tabla books
INSERT INTO books (isbn, img, title, description, language, pages, publisher, pub_date, price, stock, deleted) VALUES
(9789569545344, '/books/3.jpg', 'La casa de los espíritus', 'Novela de la autora chilena Isabel Allende que relata la historia de varias generaciones de una familia.', 'Español', 500, 'Sudamericana', '1982-01-01', 13990, 25, false),
(9789568410152, '/books/4.jpg', '2666', 'Obra póstuma del escritor chileno Roberto Bolaño, que sigue la pista de un misterioso autor de novelas policiales.', 'Español', 900, 'Anagrama', '2004-11-01', 15990, 10, false),
(9788420481853, '/books/5.jpg', 'El túnel', 'Novela del escritor argentino Ernesto Sabato, que narra la obsesión de un pintor por una mujer.', 'Español', 200, 'Seix Barral', '1948-01-01', 8990, 30, false),
(9788420706830, '/books/6.jpg', 'Los siete locos', 'Primera parte de la obra "Los siete locos y Los lanzallamas", del escritor argentino Roberto Arlt.', 'Español', 350, 'Alianza', '1929-01-01', 11990, 18, false),
(9788483835161, '/books/7.jpg', '2666', 'Novela del escritor español Roberto Bolaño, que cuenta la historia de un grupo de académicos que investigan una serie de asesinatos en Ciudad Juárez.', 'Español', 800, 'Mondadori', '2008-05-01', 17990, 22, false),
(9789562820005, '/books/8.jpg', 'Cien años de soledad', 'Novela del escritor colombiano Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.', 'Español', 432, 'DeBolsillo', '1967-05-30', 14990, 20, false),
(9788420432564, '/books/9.jpg', 'La peste', 'Novela del escritor francés Albert Camus que narra la historia de una plaga que azota la ciudad de Orán.', 'Español', 320, 'DeBolsillo', '1947-06-10', 10990, 15, false),
(9789875665677, '/books/10.jpg', 'Rayuela', 'Novela del escritor argentino Julio Cortázar que presenta una estructura narrativa no lineal y desafía las convenciones literarias.', 'Español', 600, 'Alfaguara', '1963-06-20', 15990, 20, false),
(9788437604947, '/books/11.jpg', '1984', 'Novela del escritor británico George Orwell que presenta una distopía en la que se muestra un estado totalitario y vigilante.', 'Español', 368, 'Debolsillo', '1949-06-08', 12990, 18, false),
(9788466332588, '/books/12.jpg', 'Los miserables', 'Novela del escritor francés Victor Hugo que sigue la vida de varios personajes en la Francia del siglo XIX.', 'Español', 1600, 'Punto de Lectura', '1862-04-04', 19990, 12, false),
(9788420662279, '/books/13.jpg', 'El amor en los tiempos del cólera', 'Novela del escritor colombiano Gabriel García Márquez que explora el amor a lo largo del tiempo.', 'Español', 480, 'Alfaguara', '1985-08-08', 13990, 25, true),
(9780307476463, '/books/14.jpg', 'El retrato de Dorian Gray', 'Novela del escritor irlandés Oscar Wilde que explora temas de vanidad y corrupción moral.', 'Español', 304, 'DeBolsillo', '1890-04-30', 9990, 30, false),
(9786070727523, '/books/15.jpg', 'Crónica de una muerte anunciada', 'Novela del escritor colombiano Gabriel García Márquez que narra el asesinato de un hombre en un pueblo caribeño.', 'Español', 120, 'DeBolsillo', '1981-12-05', 8990, 28, false),
(9780307476463, '/books/16.jpg', 'Crimen y castigo', 'Novela del escritor ruso Fiódor Dostoyevski que explora las profundidades de la moralidad y la culpa.', 'Español', 672, 'DeBolsillo', '1866-01-01', 16990, 16, false),
(9788437604947, '/books/17.jpg', 'Don Quijote de la Mancha', 'Novela del escritor español Miguel de Cervantes que sigue las aventuras de un caballero enloquecido y su fiel escudero.', 'Español', 1056, 'DeBolsillo', '1605-01-16', 24990, 22, false);

-- tabla authors
INSERT INTO authors (name, deleted) VALUES
('Isabel Allende', false), --1
('Ernesto Sabato', false), --2
('Roberto Arlt', false), --3
('Roberto Bolaño', false), --4
('Albert Camus', false), --5
('Gabriel García Márquez', false), --6
('Julio Cortázar', false), --7
('George Orwell', false), --8
('Victor Hugo', false), --9
('Oscar Wilde', false), --10
('Joann Sfar', true), --11
('Fiódor Dostoyevski', false), --12
('Miguel de Cervantes', false); --13

-- tabla books_authors
INSERT INTO books_authors (book_id, author_id) VALUES
(1, 1),   -- La casa de los espíritus por Isabel Allende
(2, 4),   -- 2666 por Roberto Bolaño
(3, 2),   -- El túnel por Ernesto Sabato
(4, 3),   -- Los siete locos por Roberto Arlt
(5, 4),   -- 2666 (otra editorial) por Roberto Bolaño
(6, 6),   -- Cien años de soledad por Gabriel García Márquez
(7, 5),   -- La peste por Albert Camus
(8, 7),  -- Rayuela por Julio Cortázar
(9, 8), -- 1984 por George Orwell
(10, 9), -- Los miserables por Victor Hugo
(11, 6),  -- El amor en los tiempos del cólera por Gabriel García Márquez
(12, 10), -- El retrato de Dorian Gray por Oscar Wilde
(13, 6),  -- Crónica de una muerte anunciada por Gabriel García Márquez
(14, 12), -- Crimen y castigo por Fiódor Dostoyevski
(15, 13); -- Don Quijote de la Mancha por Miguel de Cervantes

-- tabla genres
INSERT INTO genres (name, deleted) VALUES
('Filosofía', false), --1
('Realismo mágico', false), --2
('Distopía', false), --3
('Clásicos', false), --4
('Post moderno', true), --5
('Realismo Psicológico', false), --6
('Novela Histórica', false), --7
('Literatura Latinoamericana', false), --8
('Novela Gótica', false); --9

-- tabla books_genres
INSERT INTO books_genres (book_id, genre_id) VALUES
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 8),
(11, 9),
(12, 7),
(13, 6),
(14, 3);


-- tabla cart_Items
INSERT INTO cart_items (user_id, book_id, quantity, deleted) VALUES
(1, 6, 3, false),
(2, 8, 8, false),
(11, 1, 3, false),
(9, 1, 5, false),
(5, 9, 7, false),
(11, 12, 8, false),
(5, 14, 6, false),
(12, 11, 9, false),
(13, 4, 2, false),
(12, 8, 5, false),
(1, 10, 2, false),
(12, 5, 5, true),
(7, 4, 6, false),
(5, 7, 2, false),
(8, 5, 2, false),
(9, 6, 4, false),
(8, 2, 3, false),
(8, 3, 9, false),
(10, 11, 3, false),
(10, 7, 9, false),
(6, 11, 1, false),
(6, 13, 8, false),
(3, 14, 2, false),
(5, 7, 9, false),
(2,10, 2, false),
(6, 10, 2, false),
(8, 9, 8, false),
(9, 5, 7, false),
(4, 9, 5, false),
(8, 9, 2, false),
(4, 4, 7, false),
(4, 3, 8, false),
(9, 2, 2, false),
(7, 1, 9, false),
(6, 5, 8, false),
(6, 6, 3, false),
(5, 4, 5, false),
(7, 9, 1, false),
(10, 9, 9, false),
(5, 6, 10, false),
(12, 10, 8, false),
(3, 9, 2, false),
(9, 10, 7, false),
(8, 10, 2, false),
(8, 8, 1, false),
(7, 5, 4, false),
(10, 10, 8, false),
(8, 12, 5, false),
(10,6, 8, false);

--pendiente
-- tabla ratings
INSERT INTO ratings (rating_id, user_id, book_id, score, comment, wishlist, created_at, updated_at, deleted) VALUES
(3, 3, 3, 4, 'Me encantó, muy recomendado.', false, '2023-03-31T10:00:00', '2023-03-31T10:00:00', false),
(4, 4, 4, 5, 'Una obra maestra.', false, '2023-03-31T11:00:00', '2023-03-31T11:00:00', false),
(5, 5, 5, 4, 'Muy interesante, no pude dejar de leerlo.', true, '2023-03-31T12:00:00', '2023-03-31T12:00:00', false),
(6, 6, 6, 3, 'No estuvo mal, pero esperaba más.', true, '2023-03-31T13:00:00', '2023-03-31T13:00:00', false),
(7, 7, 7, 5, 'Increíble, uno de los mejores libros que he leído.', true, '2023-03-31T14:00:00', '2023-03-31T14:00:00', false),
(8, 8, 3, 4, 'Muy bueno, lo recomiendo.', true, '2023-03-31T15:00:00', '2023-03-31T15:00:00', false),
(9, 9, 9, 4, 'Interesante historia, bien desarrollada.', false, '2023-03-31T16:00:00', '2023-03-31T16:00:00', false),
(10, 10, 10, 5, 'Me encantó la estructura narrativa, muy original.', true, '2023-03-31T17:00:00', '2023-03-31T17:00:00', false),
(11, 11, 11, 4, 'Una visión aterradora pero fascinante del futuro.', false, '2023-03-31T18:00:00', '2023-03-31T18:00:00', false),
(12, 12, 12, 5, 'Una obra que te hace reflexionar sobre la condición humana.', true, '2023-03-31T19:00:00', '2023-03-31T19:00:00', false),
(13, 11, 8, 3, 'No logró captar mi atención como esperaba.', false, '2023-03-31T20:00:00', '2023-03-31T20:00:00', true),
(14, 14, 14, 4, 'Una trama intrigante que te mantiene enganchado.', false, '2023-03-31T21:00:00', '2023-03-31T21:00:00', false),
(15, 15, 15, 5, 'Una crónica impactante y bien escrita.', true, '2023-03-31T22:00:00', '2023-03-31T22:00:00', false),
(16, 5, 16, 3, 'Difícil de leer en algunos momentos, pero valió la pena.', true, '2023-03-31T23:00:00', '2023-03-31T23:00:00', false),
(17, 7, 17, 4, 'Una obra clásica que nunca pasa de moda.', false, '2023-04-01T00:00:00', '2023-04-01T00:00:00', false),
(18, 8, 10, 5, 'Una lectura obligatoria para cualquier amante de la literatura.', true, '2023-04-01T01:00:00', '2023-04-01T01:00:00', false),
(19, 9, 3, 4, 'Me hizo reflexionar sobre la naturaleza del amor y la muerte.', false, '2023-04-01T02:00:00', '2023-04-01T02:00:00', false),
(20, 10, 4, 3, 'Una historia entretenida pero predecible.', false, '2023-04-01T03:00:00', '2023-04-01T03:00:00', false),
(21, 11, 5, 5, 'Una obra maestra que merece ser leída más de una vez.', true, '2023-04-01T04:00:00', '2023-04-01T04:00:00', false),
(22, 12, 6, 4, 'Me atrapó desde la primera página.', true, '2023-04-01T05:00:00', '2023-04-01T05:00:00', false),
(23, 14, 7, 3, 'Una lectura ligera pero entretenida.', false, '2023-04-01T06:00:00', '2023-04-01T06:00:00', false),
(24, 10, 8, 4, 'Una obra que te hace cuestionar la moralidad.', true, '2023-04-01T07:00:00', '2023-04-01T07:00:00', false),
(25, 15, 9, 5, 'Una historia épica que te transporta a otro mundo.', true, '2023-04-01T08:00:00', '2023-04-01T08:00:00', false),
(26, 11, 11, 4, 'Me mantuvo en vilo hasta la última página.', true, '2023-04-01T09:00:00', '2023-04-01T09:00:00', false),
(27, 5, 12, 3, 'Una lectura interesante pero un poco lenta.', true, '2023-04-01T10:00:00', '2023-04-01T10:00:00', false),
(28, 8, 13, 5, 'Un clásico que nunca pasa de moda.', true, '2023-04-01T11:00:00', '2023-04-01T11:00:00', false);

--pendiente
-- tabla orders
INSERT INTO orders (order_id, user_id, order_date, total_amount, deleted) VALUES
(1, 3, '2023-03-31', 32000, false),
(2, 4, '2023-04-01', 45000, false),
(3, 5, '2023-04-02', 28000, false),
(4, 6, '2023-04-03', 38000, false),
(5, 7, '2023-04-04', 51000, false),
(6, 8, '2023-04-05', 29000, false),
(7, 9, '2023-04-06', 42000, false),
(8, 10, '2023-04-07', 35000, false),
(9, 11, '2023-04-08', 48000, false),
(10, 12, '2023-04-09', 39000, false),
(11, 13, '2023-04-10', 44000, false),
(12, 14, '2023-04-11', 31000, false),
(13, 15, '2023-04-12', 37000, true),
(14, 3, '2023-04-13', 49000, false),
(15, 4, '2023-04-14', 52000, false),
(16, 6, '2023-04-15', 43000, false),
(17, 4, '2023-04-16', 39000, false),
(18, 10, '2023-04-17', 36000, false),
(19, 7, '2023-04-18', 47000, false),
(20, 12, '2023-04-19', 50000, false),
(21, 14, '2023-04-20', 33000, false),
(22, 15, '2023-04-21', 41000, false),
(23, 11, '2023-04-22', 30000, false),
(24, 6, '2023-04-23', 38000, false),
(25, 7, '2023-04-24', 43000, false),
(26, 11, '2023-04-25', 46000, false),
(27, 14, '2023-04-26', 34000, false),
(28, 4, '2023-04-27', 50000, false),
(29, 3, '2023-04-28', 37000, false),
(30, 6, '2023-04-29', 41000, false);

--pendiente
-- tabla order_items
INSERT INTO order_items (order_item_id, order_id, book_id, quantity, deleted) VALUES
(1, 1, 3, 2, false),
(2, 1, 7, 1, false),
(3, 2, 5, 3, false),
(4, 2, 9, 1, false),
(5, 3, 4, 2, false),
(6, 3, 6, 1, false),
(7, 3, 8, 1, false),
(8, 4, 10, 3, false),
(9, 4, 12, 2, false),
(10, 5, 13, 4, false),
(11, 5, 14, 2, false),
(12, 6, 15, 3, false),
(13, 6, 16, 1, true),
(14, 6, 17, 2, false),
(15, 7, 4, 1, false),
(16, 7, 9, 3, false),
(17, 7, 6, 2, false),
(18, 8, 17, 2, false),
(19, 8, 15, 1, false),
(20, 9, 13, 3, false),
(21, 9, 11, 2, false),
(22, 10, 8, 4, false),
(23, 10, 9, 1, false),
(24, 10, 12, 2, false),
(25, 11, 10, 2, false),
(26, 11, 6, 1, false),
(27, 12, 5, 3, false),
(28, 12, 4, 2, false),
(29, 13, 7, 4, false),
(30, 13, 9, 1, false),
(31, 13, 4, 2, false),
(32, 14, 5, 2, false),
(33, 14, 6, 1, false),
(34, 15, 7, 3, false),
(35, 15, 8, 2, false),
(36, 16, 9, 4, false),
(37, 16, 4, 1, false),
(38, 17, 4, 2, false),
(39, 17, 6, 1, false),
(40, 18, 8, 3, false),
(41, 18, 3, 2, false),
(42, 18, 12, 2, false),
(43, 19, 13, 4, false),
(44, 19, 14, 1, false),
(45, 20, 17, 3, false),
(46, 20, 13, 2, false),
(47, 21, 10, 1, false),
(48, 21, 6, 2, false);






