/* eslint-disable no-undef */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function CartTotal() {
  const { cart_items, setCartItemsCheckout, cartItemsCheckout } =
    useContext(ECommerceContext);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice =  () => {
    let totalPrice = 0;
    for (const cartItem of cart_items) {
      const book = cartItem.book.book;
      if (book) {
        console.log(book);
        totalPrice += cartItem.quantity * book.price;
      }
      let newItem = [];
      newItem.push({
        name: book.title,
        cartItemId: cartItem.cart_item_id,
        bookId: cartItem.book_id,
        quantity: parseInt(cartItem.quantity),
        price: book ? parseInt(book.price) : 0,
      });

      setCartItemsCheckout([...cartItemsCheckout, newItem]);
    }

    setTotalPrice(totalPrice);
  };
  useEffect(() => {
    setCartItemsCheckout([]);
    calculateTotalPrice();
  }, [cart_items]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end px-4 md:px-20 mb-4">
      <h1 className="font-bold text-2xl">Total</h1>
      <h1 className="font-bold text-2xl">
        $ {totalPrice.toLocaleString('es-CL')}
      </h1>
      <Button
        onClick={() => {
          console.log(cartItemsCheckout);
          navigate('/checkout');
        }}
      >
        Continuar con el pago
      </Button>
    </div>
  );
}
