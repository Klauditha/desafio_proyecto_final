/* eslint-disable no-unused-vars */
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const SuccessPayment = () => {
  const { setCartItemsCheckout, cartItemsCheckout, cart_items } =
    useContext(ECommerceContext);

  const limpiarCarrito = () => {};

  const creacionOrden = () => {
      
  }

  const { session_id } = useParams();
  console.log(cartItemsCheckout);
  console.log(cart_items);
  console.log(session_id);

  useEffect(() => {}, []);

  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center">Orden</h1>
      <div className="flex justify-center pl-8 mt-4 mb-4">
        <div className="w-full md:w-1/2 px-3 mt-8 mb-8 ml-8 md:mb-0">
          <h2>Orden creada correctamente</h2>
          <p>
            Su pago ha sido procesado correctamente. Su pedido se encuentra en
            preparación.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
