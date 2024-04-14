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
      <h1 className="font-bold text-xl text-center pt-2">Novedades</h1>
      <h2 className="text-md font-bold text-center mb-4">Del 2024</h2>
      <div className="flex flex-wrap gap-8 md:gap-24 justify-center w-full md:py-8">
        {booksNews
          ? booksNews.map((book) => (
              <Bookcard
                key={book.book_id}
                book={book}
                btnAddCart={true}
                displayPrice={true}
                displayLanguage={true}
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
