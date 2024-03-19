/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ECommerceContext } from '@/Context/ECommerceContext';
import { useNavigate } from 'react-router-dom';

const Bookcard = ({
  book,
  btnAddCart,
  btnEditBook,
  btnDeleteBook,
  displayPrice,
  displayLanguage,
  displayQuantitySold,
}) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(ECommerceContext);
  const { setWishlist } = useContext(ECommerceContext);

  return (
    <Card className="w-full max-w-xs">
      <div className="grid w-full">
        <div className="relative w-full">
          <img
            alt="Book cover"
            className="w-full object-fit"
            height={400}
            src={process.env.URL_SITE + book.img}
            style={{
              aspectRatio: '400/400',
              objectFit: 'contain',
            }}
            width={400}
            onClick={() => navigate(`/book/${book.bookId}`)}
          />
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold">{book.title}</CardTitle>
        <CardTitle className="text-sm font-medium">{book.author}</CardTitle>
        {displayQuantitySold ? (
          <CardDescription className="text-sm font-semibold text-blue-500 text-center mb-2">
            Vendidos: {book.sold}
          </CardDescription>
        ) : null}
        {displayLanguage ? (
          <CardDescription className="text-sm font-medium">
            Idioma: {book.language}
          </CardDescription>
        ) : null}

        <div className="flex items-center justify-between">
          {displayPrice ? (
            <span className="text-sm font-medium">${book.price}</span>
          ) : null}
          {btnAddCart ? (
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => addToCart(book)}
            >
              Agregar al carrito
            </Button>
          ) : null}
          {btnEditBook ? (
            <Button
              size="sm"
              className="bg-lime-700 hover:bg-lime-800"
              onClick={() => navigate(`/managerbooks/edit/${book.bookId}`)}
            >
              Editar
            </Button>
          ) : null}
          {btnDeleteBook ? (
            <Button
              size="sm"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => navigate(`/deleteBook/${book.bookId}`)}
            >
              Eliminar
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookcard;
