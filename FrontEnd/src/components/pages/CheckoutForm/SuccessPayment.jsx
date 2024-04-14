/* eslint-disable no-unused-vars */
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const SuccessPayment = () => {
  const { setCartItemsCheckout, cartItemsCheckout, cart_items } =
    useContext(ECommerceContext);
  const { session_id } = useParams();
  console.log(cartItemsCheckout);
  console.log(cart_items);
  console.log(session_id);
  return <div>Pago exitoso</div>;
};

export default SuccessPayment;
