/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import { useParams } from 'react-router-dom';
import Productdetail from '../Productdetail';

const BookDetail = () => {
  const { id } = useParams();
  const { books } = useContext(ECommerceContext);

  const bookFiltrado = books.filter((book) => book.bookId === id);

  return (
    <div>
      <Productdetail book={bookFiltrado[0]} />
    </div>
  );
};

export default BookDetail;
