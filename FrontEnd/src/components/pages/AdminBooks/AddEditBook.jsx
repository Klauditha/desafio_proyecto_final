/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddEditBook = () => {
  let { bookId } = useParams();
  const { genres, authors, books, booksAuthors, bookGenres } =
    useContext(ECommerceContext);
  const navigate = useNavigate();
  const [estadoCarga, setEstadoCarga] = useState(false);
  const [formData, setFormData] = useState({
    bookId: '',
    isbn: '',
    img: '',
    title: '',
    description: '',
    language: '',
    pages: '',
    price: '',
    pubDate: '',
    publisher: '',
    stock: '',
    author_id: '',
    genre_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeAuthor = (value) => {
    setFormData({
      ...formData,
      author_id: value,
    });
  };

  const handleChangeLanguage = (value) => {
    setFormData({
      ...formData,
      language: value,
    });
  };
  const handleChangeGenre = (value) => {
    formData.genre_id = value;
  };

  const validateForm = () => {
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let metodo = formData.bookId ? 'edit' : 'add';

    if (validateForm()) {
      try {
        switch (metodo) {
          case 'add':
            const id = Math.floor(Math.random() * 1000);
            const newBook = {
              bookId: id.toString(),
              isbn: formData.isbn,
              img: '/books/notAvailable.jpg',
              title: formData.title,
              description: formData.description,
              language: formData.language,
              pages: formData.pages,
              publisher: formData.publisher,
              pubDate: formData.pubDate,
              stock: formData.stock,
              price: formData.price,
            };
            const newBookAuthor = {
              bookId: id.toString(),
              authorId: formData.author_id.toString(),
            };
            const newBookGenre = {
              book_id: id.toString(),
              genre_id: formData.genre_id,
            };

            books.push(newBook);
            booksAuthors.push(newBookAuthor);
            bookGenres.push(newBookGenre);

            alert('Libro agregado exitosamente');
            navigate('/managerbooks');

            break;
          case 'edit':
            const bookFound = books.find(
              (book) => book.bookId.toString() === bookId
            );

            if (bookFound) {
              bookFound.isbn = formData.isbn;
              bookFound.img = formData.img;
              bookFound.title = formData.title;
              bookFound.description = formData.description;
              bookFound.language = formData.language;
              bookFound.pages = formData.pages;
              bookFound.publisher = formData.publisher;
              bookFound.pubDate = formData.pubDate;
              bookFound.stock = formData.stock;
              bookFound.price = formData.price;
            }

            const bookAuthorFound = booksAuthors.find(
              (bookAuthor) => bookAuthor.bookId.toString() === bookId
            );

            if (bookAuthorFound) {
              bookAuthorFound.authorId = formData.author_id.toString();
            }

            const bookGenreFound = bookGenres.find(
              (bookGenre) => bookGenre.book_id.toString() === bookId
            );

            if (bookGenreFound) {
              bookGenreFound.genre_id = formData.genre_id;
            }

            const index = books.findIndex(
              (book) => book.bookId.toString() === bookId
            );
            books[index] = bookFound;
            booksAuthors[index] = bookAuthorFound;
            bookGenres[index] = bookGenreFound;

            alert('Libro editado exitosamente');
            navigate('/managerbooks');
            break;
          default:
            break;
        }
      } catch (error) {
        alert('Error al agregar el libro. Intenta de nuevo');
      }
    }
  };

  const setearDatosEdicion = () => {
    if (bookId && !estadoCarga) {
      const bookFound = books.find((book) => book.bookId.toString() === bookId);
      const bookAuthorsFound = booksAuthors.find(
        (bookAuthor) => bookAuthor.bookId === bookId
      );
      const bookGenresFound = bookGenres.find(
        (bookGenre) => bookGenre.book_id.toString() === bookId
      );

      if (bookFound) {
        formData.bookId = bookFound.bookId;
        formData.isbn = bookFound.isbn;
        formData.img = bookFound.img;
        formData.title = bookFound.title;
        formData.description = bookFound.description;
        formData.language = bookFound.language;
        formData.pages = bookFound.pages;
        formData.price = bookFound.price;
        formData.pubDate = bookFound.pubDate;
        formData.publisher = bookFound.publisher;
        formData.stock = bookFound.stock;
      }

      if (bookAuthorsFound) formData.author_id = bookAuthorsFound.authorId;
      if (bookGenresFound) formData.genre_id = bookGenresFound.genre_id;
    }

    setEstadoCarga(true);
  };

  useEffect(() => {
    if (!estadoCarga) setearDatosEdicion();
  }, [bookId]);

  return (
    <div className="flex flex-col gap-4 px-4 md:px-20">
      <h1 className="font-bold text-2xl">
        {bookId ? 'Editar libro' : 'Nuevo libro'}
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Título
            </Label>
            <Input
              className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              required
              type="text"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="author"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Autor
            </Label>
            <Select
              name="author_id"
              value={formData.author_id}
              required
              onValueChange={handleChangeAuthor}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Selecciona un autor"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona un autor</SelectLabel>
                  {authors ? (
                    authors.map((author) => (
                      <SelectItem key={author.authorId} value={author.authorId}>
                        {author.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="1">No hay autores</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-full px-3 mt-2">
            <Label
              htmlFor="description"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Descripción
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
              type="text"
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="isbn"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Isbn
            </Label>
            <Input
              id="isbn"
              placeholder="Isbn"
              type="text"
              required
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="language"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Lenguaje
            </Label>
            <Select
              name="language"
              value={formData.language}
              required
              onValueChange={handleChangeLanguage}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Seleccione un lenguaje"
                  required
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona un lenguaje</SelectLabel>
                  <SelectItem value="Español">Español</SelectItem>
                  <SelectItem value="Ingles">Ingles</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="pages"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Páginas
            </Label>
            <Input
              id="pages"
              placeholder="Páginas"
              required
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="genre"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Genero
            </Label>
            <Select
              name="genre_id"
              value={formData.genre_id}
              required
              onValueChange={handleChangeGenre}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Selecciona un genero"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Selecciona un genero</SelectLabel>
                  {genres ? (
                    genres.map((genre) => (
                      <SelectItem key={genre.genre_id} value={genre.genre_id}>
                        {genre.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p>Cargando...</p>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="editorial"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Editorial
            </Label>
            <Input
              id="editorial"
              placeholder="Editorial"
              name="publisher"
              type="text"
              required
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="pubDate"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Fecha de publicación
            </Label>
            <Input
              id="pubDate"
              name="pubDate"
              value={formData.pubDate}
              onChange={handleChange}
              placeholder="Fecha de publicación"
              required
              type="date"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="stock"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Stock
            </Label>
            <Input
              id="stock"
              placeholder="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              type="number"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="price"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Precio
            </Label>
            <Input
              id="price"
              placeholder="Precio"
              required
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-full px-3 mt-2 flex justify-end">
            {bookId ? (
              <Button className="bg-lime-700">Editar</Button>
            ) : (
              <Button className="bg-blue-500">Agregar</Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditBook;
