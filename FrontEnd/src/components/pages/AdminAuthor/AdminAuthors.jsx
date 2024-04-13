/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';
import * as Dialog from '@radix-ui/react-dialog';
import '../../ui/dialog.css';

const AdminAuthors = () => {
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
  const { ObtenerAutoresTodosAPI, authorsAll, setAuthorsAll } =
    useContext(ECommerceContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  

    const activarAutor = (author_id) => {
    alertify
      .confirm(
        'Activar Autor',
        '¿Seguro que quieres activar este autor?',
        function () {
          try {
            let token = sessionStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            axios
              .put(`${ENDPOINT.author}/activate/${author_id}`, {}, { headers })
              .then((response) => {
                ObtenerAutoresTodosAPI();
                alertify.success('Autor activado exitosamente');
              })
              .catch((error) => {
                console.log(error);
                alertify.error('Error al activar autor');
              });
          } catch (error) {
            console.log(error);
            alertify.error('Error al activar autor');
          }
        },
        function () {
          alertify.confirm().close();
        }
      )
      .set({
        labels: {
          ok: 'SI',
          cancel: 'NO',
        },
      });
  };

  const desactivarAutor = (author_id) => {
    alertify
      .confirm(
        'Desactivar Autor',
        '¿Seguro que quieres desactivar este autor?',
        function () {
          try {
            let token = sessionStorage.getItem('token');
            axios
              .delete(`${ENDPOINT.author}/${author_id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                ObtenerAutoresTodosAPI();
                alertify.success('Autor desactivado exitosamente');
              })
              .catch((error) => {
                console.log(error);
                alertify.error('Error al desactivar autor');
              });
          } catch (error) {
            alertify.error('Error al desactivar autor');
            console.log(error);
          }
        },
        function () {
          alertify.confirm().close();
        }
      )
      .set({
        labels: {
          ok: 'SI',
          cancel: 'NO',
        },
      });
  };
  useEffect(() => {}, []);
  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center">Mantenedor Autores</h1>
      <div
        className="flex justify-center pl-8 mt-4 mb-4"
        onClick={() => navigate('/managerauthors/add')}
      >
        <Button size="sm" className="bg-blue-500">
          Añadir Autor
        </Button>
      </div>
      <div className="pl-8 pr-8 overflow-x-auto">
        <table className="table table-fixed w-full text-center border border-gray-300 rounded">
          <thead className="bg-blue-800 text-white mt-4 ">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad Libros Asociados</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {authorsAll.map((author) => (
              <tr
                className="text-center border border-gray-300"
                key={author.author_id}
              >
                <td>{author.author_id}</td>
                <td className="w-1/12 text-left">{author.name}</td>
                <td className="w-1/12">{author.quantitybook}</td>
                <td className="flex justify-center">
                  <Button
                    size="sm"
                    className="m-auto bg-yellow-500 hover:bg-yellow-800  p-2"
                    onClick={() => {
                      
                      wait().then(() => {
                        setOpen(true);
                        console.log(open);
                      });
                    }}
                  >
                    Editar
                  </Button>
                  {author.deleted ? (
                    <Button
                      size="sm"
                      className="m-auto bg-green-500 hover:bg-green-800  pl-4 pr-4"
                      onClick={() => {
                        activarAutor(author.author_id);
                      }}
                    >
                      Activar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="m-auto bg-red-500 hover:bg-red-800 p-2"
                      onClick={() => {
                        desactivarAutor(author.author_id);
                      }}
                    >
                      Desactivar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAuthors;
