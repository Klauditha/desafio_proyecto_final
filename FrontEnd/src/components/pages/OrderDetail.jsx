import { useParams } from 'react-router-dom';
import { ECommerceContext } from '../../Context/ECommerceContext';
import { useEffect, useState, useContext } from 'react';
import { Label } from '../ui/label';

const OrderDetail = () => {
  let { order_id } = useParams();
  const { orderDetail, ObtenerOrdenDetalleAPI, ordersUser } =
    useContext(ECommerceContext);
  let cantidadItems = 0;
  let total = 0;
  let fechaOrden = '';
  const ObtenerCantidadItems = () => {
    for (let i = 0; i < orderDetail.length; i++) {
      cantidadItems += parseInt(orderDetail[i].quantity);
    }
    return cantidadItems;
  };

  const ObtenerTotal = () => {
    for (let i = 0; i < orderDetail.length; i++) {
      total += orderDetail[i].price * orderDetail[i].quantity;
    }
    return total;
  };

  const ObtenerFechaOrden = () => {
    for (let i = 0; i < ordersUser.length; i++) {
      if (ordersUser[i].order_id === parseInt(order_id)) {
        fechaOrden = ordersUser[i].order_date;
      }
    }
    return fechaOrden;
  };

  useEffect(() => {
    ObtenerOrdenDetalleAPI(order_id);
    console.log(orderDetail);
  }, [order_id]);
  return (
    <div className="flex flex-col gap-4 px-4 md:px-20 py-4">
      <h1 className="font-bold text-2xl text-center">
        Detalle de Orden #{order_id}
      </h1>
      <div className="flex flex-col border-2 border-balance border-blue-500 pt-2 pb-2">
        <div className="flex flex-row gap-2  pl-16 ml-16 justify-between md:gap-16 pr-16 mr-16">
          <Label className="text-md font-semibold text-balance text-center">
            Fecha:
          </Label>
          <Label className="text-md text-balance text-center">
            {ObtenerFechaOrden()}
          </Label>
        </div>
        <div className="flex flex-row gap-2 pl-16 ml-16 justify-between md:gap-16 pr-16 mr-16">
          <Label className="text-md font-semibold text-balance text-center">
            Cantidad de productos:
          </Label>
          <Label className="text-md text-balance text-center">
            {ObtenerCantidadItems()}
          </Label>
        </div>
        <div className="flex flex-row gap-2 pl-16 ml-16 justify-between md:gap-16 pr-16 mr-16">
          <Label className="text-md font-semibold text-balance text-center">
            Total orden:
          </Label>
          <Label className="text-md text-balance text-center">
            $ {ObtenerTotal().toLocaleString('es-CL')}
          </Label>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-2 justify-center w-full pb-4 border-blue-200  border-2">
        {orderDetail.length > 0 ? (
          orderDetail.map((order) => (
            <div
              key={order.order_id}
              className="flex flex-col md:flex-row items-center  gap-8 border-b border-gray-200 dark:border-gray-800 px-4 md:px-20"
            >
              <img
                src={order.img}
                alt={order.title}
                className="aspect-[9-16] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                height={220}
                width={130}
              />
              <h3 className="text-md font-semibold text-balance text-left md:w-1/4">
                {order.title}
              </h3>

              <h3 className="text-md font-semibold text-balance text-left md:w-1/6">
                $ {order.price.toLocaleString('es-CL')}
              </h3>
              <h3 className="text-md font-semibold text-balance text-left md:w-1/4">
                {order.quantity}
              </h3>
              <h3 className="text-md font-semibold text-balance text-left md:w-1/6">
                $ {order.price * order.quantity}
              </h3>
            </div>
          ))
        ) : (
          <p>No hay detalles de la orden</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
