/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';
import RequireAuth from '@/components/RequireAuth';

const SuccessPayment = () => {
  const [estado, setEstado] = useState(false);

  console.log('estado', estado);
  const creacionOrden = () => {
    let user_id = parseInt(sessionStorage.getItem('user_id'), 10);
    crearOrdenByUserAPI(user_id);
  };

  const crearOrdenByUserAPI = (user_id) => {
    setEstado(true);
    try {
      console.log('crearOrdenByUserAPI', user_id);
      let token = sessionStorage.getItem('token');
      console.log('token', token);
      axios
        .post(
          ENDPOINT.orders + '/createbyuser/' + user_id,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((response) => {
          limpiarCarritoByUser(user_id);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alertify.error('Error al crear la orden');
      console.log('Error al crear la orden:', error);
    }
  };

  const limpiarCarritoByUser = (user_id) => {
    try {
      let token = sessionStorage.getItem('token');
      axios
        .delete(ENDPOINT.cart + '/DeleteByUser/' + user_id, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          alertify.success('Orden creada con exito');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      alertify.error('Error al limpiar el carrito');
      console.log('Error al limpiar el carrito:', error);
    }
  };

  if (!estado) {
    setEstado(true);
    creacionOrden();
  }

  return (
    <RequireAuth>
      <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
        <h1 className="font-bold text-xl text-center">Orden</h1>
        <div className="flex justify-center pl-8 mt-4 mb-4">
          <div className="w-full md:w-1/2 px-3 mt-8 mb-8 ml-8 md:mb-0">
            <p>
              Su pago ha sido procesado correctamente. Su pedido se encuentra en
              preparación.
            </p>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default SuccessPayment;
