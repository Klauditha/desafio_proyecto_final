import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import React, { useContext, useState, useEffect } from "react";
import { ECommerceContext } from "../../Context/ECommerceContext";
import RequireAuth from "../RequireAuth";

const Userprofile = () => {
  const { dataAuthenticatedUser, setearDataUserAuth } =
    useContext(ECommerceContext);

    useEffect(() => {
      setearDataUserAuth();
    }, []);

  return (
    <RequireAuth>
      <div className="w-full flex justify-center">
        <Card className="flex justify-center w-fit p-8">
          <div className="flex flex-col justify-start items-start gap-8">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-3xl font-bold">Datos de tu cuenta</h1>
            </div>
            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Nombre de usuario</h2>
                <p>{dataAuthenticatedUser.username}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Nombre y apellido</h2>
                <p>
                  {dataAuthenticatedUser.first_name}{" "}
                  {dataAuthenticatedUser.last_name}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Ubicación</h2>
                <p>
                  {dataAuthenticatedUser.district}
                  {", "}
                  {dataAuthenticatedUser.region}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Dirección</h2>
                <p>{dataAuthenticatedUser.address}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Número de teléfono</h2>
                <p>{dataAuthenticatedUser.phone}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Email</h2>
                <p>{dataAuthenticatedUser.email}</p>
              </div>
              <div className="space-y-2 pb-8">
                <h2 className="text-lg font-semibold">Código postal</h2>
                <p>{dataAuthenticatedUser.zip_code}</p>
              </div>
              <div className="flex w-full justify-center">
                <Link>
                  <Button variant="secondary" className="w-64" to="/">
                    Volver
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <Link>
                <Button variant="destructive" className="w-64" to="/">
                  Eliminar cuenta
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </RequireAuth>
  );
};

export default Userprofile;
