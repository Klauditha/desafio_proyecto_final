import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import React, { useContext } from 'react';


const Userprofile = () => {
    // const { users, setUsers } = useContext(ECommerceContext);
    
  return (
    <div className="w-full flex justify-center">

    <Card className="flex justify-center w-fit p-8">
      <div className="flex flex-col justify-start items-start gap-8">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-3xl font-bold">Datos de tu cuenta</h1>
        </div>
        <div className="space-y-4 w-full">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Nombre y apellido</h2>
            <p>Lucas Saavedra</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Ubicación</h2>
            <p>Comuna, Región</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Dirección</h2>
            <p>Las acacias 2244</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Número de teléfono</h2>
            <p>9525254625</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Email</h2>
            <p>Los Cobres 423</p>
          </div>
          <div className="space-y-2 pb-8">
            <h2 className="text-lg font-semibold">Código postal</h2>
            <p>67789</p>
          </div>
          <div className="flex w-full justify-center">
          <Link>
          <Button variant="secondary" className="w-64" to="/">Volver</Button>
          </Link>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
};

export default Userprofile;
