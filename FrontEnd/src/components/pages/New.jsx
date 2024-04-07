/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const New = () => {
  const { booksNews, searchBooks, obtenerNovedadesLibros , setSearchBooks} =
    useContext(ECommerceContext);

  useEffect(() => {
    obtenerNovedadesLibros();
  }, [searchBooks]);

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Novedades</h1>
      <h2 className="text-md font-bold text-center mb-4">Del 2024</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-center">
        {booksNews
          ? booksNews.map((book) => (
              <Bookcard
                key={book.book_id}
                book={book}
                btnAddCart={true}
                displayPrice={true}
                displayLanguage={false}
                displayQuantitySold={false} /*Pendiente*/
                displayPubDate={true}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default New;
