/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';
import RequireAuth from '@/components/RequireAuth';
import { useNavigate } from 'react-router-dom';

const SuccessPayment = () => {
  const [estado, setEstado] = useState(false);
  const navigate = useNavigate();
  const creacionOrden = () => {
    let user_id = parseInt(sessionStorage.getItem('user_id'), 10);
    if (user_id) {
      crearOrdenByUserAPI(user_id);
    } else navigate('/');
  };

  const crearOrdenByUserAPI = (user_id) => {
    setEstado(true);
    try {
      let token = sessionStorage.getItem('token');
      //console.log('token', token);
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
          setTimeout(() => {
            navigate('/myorders');
          }, 2000);
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
        <h1 className="font-bold text-xl text-center">Proceso de Pago</h1>
        <div className="flex justify-center pl-8mb-4">
          <div className="w-full md:w-1/2 px-3 text-center text-md mt-4 ">
            <h4 className="mt-4">Su pago ha sido procesado correctamente.</h4>
            <h4 className='mt-4'>Su pedido se encuentra en preparación.</h4>
            <h4 className='mt-4'>Será notificado por correo cuando su pedido este listo.</h4>
            <h4 className="mt-4 text-md font-bold">Gracias por su preferencia</h4>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
};

export default SuccessPayment;
