/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import Bookcard from '../Bookcard';

const Bestselling = () => {
  const { books } = useContext(ECommerceContext);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Los más vendidos</h1>
      <div className="flex gap-4">
        {books.map((book) => (
          <Bookcard key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Bestselling;
