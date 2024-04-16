/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import axios from 'axios';
import { ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';

const MyOrders = () => {
  const navigate = useNavigate();
  const { ObtenerOrdenesByUsuarioAPI, ordersUser } =
    useContext(ECommerceContext);


  useEffect(() => {
    ObtenerOrdenesByUsuarioAPI();
  }, []);

  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center pt-2">Mis Ordenes</h1>
      <div className="pl-8 pr-8 overflow-x-auto">
        <table className="table table-fixed w-full text-center border border-gray-300 rounded">
          <thead className="bg-blue-800 text-white mt-4 ">
            <tr>
              <th>Id</th>
              <th>Fecha Orden</th>
              <th>Monto Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {ordersUser &&
              ordersUser.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.total_amount}</td>
                  <td>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => navigate(`/order/${order.order_id}`)}
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
