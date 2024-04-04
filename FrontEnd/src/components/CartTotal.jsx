/* eslint-disable no-undef */
import { useContext } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';
import { Button } from './ui/button';

export default function CartTotal() {
  const { cart_items, getBookDetailsById } = useContext(ECommerceContext);

  const totalPrice = cart_items.reduce((total, cartItem) => {
    const book = getBookDetailsById(cartItem.book_id);
    if (book) {
      return total + cartItem.quantity * book.price;
    }
    return total;
  }, 0);

  const continuarPago = () => {
    alertify.success('Funcionalidad no disponible');
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end px-4 md:px-20 ">
      <h1 className="font-bold text-2xl">Total</h1>
      <h1 className="font-bold text-2xl">
        $ {totalPrice.toLocaleString('es-CL')}
      </h1>
      <Button onClick={continuarPago}>
        Continuar con el pago
      </Button>
    </div>
  );
}
