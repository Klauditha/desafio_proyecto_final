/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const Bestselling = () => {
  const {
    booksMasVendidos,
    searchBooks,
    obtenerLibrosMasVendidos,
  } = useContext(ECommerceContext);

  useEffect(() => {
    obtenerLibrosMasVendidos();
  }, [searchBooks]);

  return (
    <div>
      <h1 className="font-bold text-xl text-center pt-2">Los más vendidos</h1>
      <h2 className="text-md font-bold text-center mb-4">Nuestros Top 10</h2>
      <div className="flex flex-wrap gap-8 md:gap-24 justify-center w-full md:py-8">
        {booksMasVendidos ? (
          booksMasVendidos.map((book) => (
            <Bookcard
              key={book.book_id}
              book={book}
              btnAddCart={true}
              displayPrice={true}
              displayLanguage={false}
              displayQuantitySold={false}
            />
          ))
        ) : (
          <p>No hay libros asociados a la categoría</p>
        )}
      </div>
    </div>
  );
};

export default Bestselling;
