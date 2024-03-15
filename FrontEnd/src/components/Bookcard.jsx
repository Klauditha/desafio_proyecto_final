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
import.meta.env.VITE_API_URL;

const Bookcard = ({ book }) => {
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
        <CardDescription className="mb-4 text-sm">
          {book.language}
        </CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">${book.price}</span>
          <Button size="sm">Agregar al carrito</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Bookcard;
