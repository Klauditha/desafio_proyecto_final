/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { ECommerceContext } from '@/Context/ECommerceContext';
import { Button } from './ui/button';

export default function CartTotal() {
  const { cart_items } = useContext(ECommerceContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = async () => {
      let totalPrice = 0;
      for (const cartItem of cart_items) {
        const book = cartItem.book.book;
        if (book) {
          totalPrice += cartItem.quantity * book.price;
        }
      }
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [cart_items]);

  const continuarPago = () => {
    alertify.success("Funcionalidad no disponible");
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-end px-4 md:px-20 mb-4">
      <h1 className="font-bold text-2xl">Total</h1>
      <h1 className="font-bold text-2xl">
        $ {totalPrice.toLocaleString("es-CL")}
      </h1>
      <Button onClick={continuarPago}>Continuar con el pago</Button>
    </div>
  );
}
