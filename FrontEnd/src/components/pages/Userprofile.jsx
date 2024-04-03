import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import React, { useContext, useState, useEffect } from "react";
import { ECommerceContext } from "../../Context/ECommerceContext";
import RequireAuth from "../RequireAuth";
import axios from "axios";
import { ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

const Userprofile = () => {
  const { dataAuthenticatedUser, setearDataUserAuth } =
    useContext(ECommerceContext);
    const [confirmationDialog, setConfirmationDialog] = useState(false);

    useEffect(() => {
      setearDataUserAuth();
    }, []);

    const navigate = useNavigate();

    const handleDeleteAccount = () => {
      setConfirmationDialog(true);
    };

    const confirmDeleteAccount = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (token) {
          const response = await axios.delete(
            `${ENDPOINT.users}/${dataAuthenticatedUser.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            sessionStorage.clear();
            window.location.href = "/";
            console.log("Cuenta de usuario ha sido borrada exitosamente.");
          } else {
            console.error("No se ha podido borrar la cuenta de usuario.");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error borrando cuenta de usuario:", error);
      }
    };

    const cancelDeleteAccount = () => {
      setConfirmationDialog(false);
    };

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
            {dataAuthenticatedUser && dataAuthenticatedUser.admin && ( //boton para eliminar cuenta solo cuando el usuario es admin
              <div className="flex w-full justify-center">
                <Link>
                  <Button
                    variant="destructive"
                    className="w-64"
                    onClick={handleDeleteAccount}
                  >
                    Eliminar cuenta (Admin)
                  </Button>
                </Link>
              </div>
            )}
            {confirmationDialog && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <Card className="p-8">
                  <p>¿Estás seguro de que quieres eliminar tu cuenta?</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button
                      variant="destructive"
                      onClick={confirmDeleteAccount}
                    >
                      Sí, eliminar
                    </Button>
                    <Button variant="secondary" onClick={cancelDeleteAccount}>
                      Cancelar
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Card>
      </div>
    </RequireAuth>
  );
};

export default Userprofile;
