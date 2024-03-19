/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';
const Publishers = () => {
  const { books } = useContext(ECommerceContext);
  const [seleccion, setSeleccion] = React.useState('');
  const [booksByPublisher, setBooksByPublisher] = useState(books);

  let publishers = books
    .map((book) => book.publisher)
    .filter((value, index, self) => self.indexOf(value) === index);
  publishers = publishers.sort();

  const filterByPublisher = (publisher) => {
    if (publisher === '') {
      setBooksByPublisher(books);
    } else {
      const filteredBooks = books.filter(
        (book) => book.publisher === publisher
      );
      setBooksByPublisher(filteredBooks);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Editoriales</h1>
      <div className="flex flex-row justify-center">
        <div className="w-full md:w-1/2 px-3 mt-8 mb-8 ml-8 md:mb-0">
          <select
            id="publishers"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(event) => {
              setSeleccion(event.target.value);
              filterByPublisher(event.target.value);
            }}
          >
            <option value="">Seleccione una editorial</option>
            {publishers.map((publisher) => (
              <option key={publisher} value={publisher}>
                {publisher}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-auto-cols gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between mt-8">
        {booksByPublisher.map((book) => (
          <Bookcard
            key={book.bookId}
            book={book}
            btnAddCart={true}
            displayPrice={true}
            displayLanguage={false}
            displayQuantitySold={false}
            displayPubDate={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Publishers;
