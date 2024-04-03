/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const Bestselling = () => {
  const {
    booksMasVendidos,
    //obtenerLibrosMasVendidos,
    searchBooks,
    filtrarMasVendidos,
  } = useContext(ECommerceContext);

  useEffect(() => {
    console.log('Obteniendo libros más vendidos...');
    filtrarMasVendidos();
  }, [searchBooks]);

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Los más vendidos</h1>
      <h2 className="text-md font-bold text-center mb-4">Nuestros Top 10</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-center">
        {booksMasVendidos ? (
          booksMasVendidos.map((book) => (
            <Bookcard
              key={book.book_id}
              book={book}
              btnAddCart={true}
              displayPrice={true}
              displayLanguage={false}
              displayQuantitySold={true}
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
