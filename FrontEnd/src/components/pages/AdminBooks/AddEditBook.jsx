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
const AddEditBook = () => {
  const { bookId } = useParams();
  const { genres, authors, books, booksAuthors } = useContext(ECommerceContext);
  const bookFound = books.find((book) => book.bookId.toString() === bookId);
  
  console.log(bookFound);
  console.log(booksAuthors);

  return (
    <div className="flex flex-col gap-4 px-4 md:px-20">
      <h1 className="font-bold text-2xl">
        {bookFound ? 'Editar libro' : 'Nuevo libro'}
      </h1>
      <form className="w-full">
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
              value={bookFound ? bookFound.title : ''}
              onChange={(e) => (bookFound.title = e.target.value)}
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
            <Select>
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
              placeholder="Descripción"
              value={bookFound ? bookFound.description : ''}
              onChange={(e) => (bookFound.description = e.target.value)}
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
              required
              type="text"
              value={bookFound ? bookFound.isbn : ''}
              onChange={(e) => (bookFound.isbn = e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="language"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Lenguaje
            </Label>
            <Select>
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
                  <SelectItem value="1">Español</SelectItem>
                  <SelectItem value="2">Ingles</SelectItem>
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
              value={bookFound ? bookFound.pages : ''}
              onChange={(e) => (bookFound.pages = e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mt-2">
            <Label
              htmlFor="genre"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Genero
            </Label>
            <Select>
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
              required
              type="text"
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
              value={bookFound ? bookFound.pubDate : ''}
              onChange={(e) => (bookFound.pubDate = e.target.value)}
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
              value={bookFound ? bookFound.stock : ''}
              onChange={(e) => (bookFound.stock = e.target.value)}
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
              value={bookFound ? bookFound.price : ''}
              onChange={(e) => (bookFound.price = e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3 mt-2 flex justify-end">
            {bookFound ? (
              <Button
                className="bg-lime-700"
               
              >
                Editar
              </Button>
            ): <Button
              className="bg-blue-500"
              
            >
              Agregar
            </Button>}
            
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditBook;
