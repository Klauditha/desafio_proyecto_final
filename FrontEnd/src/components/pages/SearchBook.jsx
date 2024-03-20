/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const SearchBook = ({ searchValue }) => {
  const { books } = useContext(ECommerceContext);

  return (
    <div>
      <h1 className="font-bold text-xl text-center">Los más vendidos</h1>
      <h2 className="text-md font-bold text-center mb-4">Nuestros Top 10</h2>
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-center">
        {books.map((book) => (
          <Bookcard
            key={book.bookId}
            book={book}
            btnAddCart={true}
            displayPrice={true}
            displayLanguage={false}
            displayQuantitySold={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBook;
