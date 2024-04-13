/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';
import { Dialog } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
const AdminAuthors = () => {
  const { ObtenerAutoresTodosAPI, authorsAll } =
    useContext(ECommerceContext);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [nameEditar, setNameEditar] = useState('');
  const [author_idEditar, setAuthor_idEditar] = useState(0);
  const [nameAgregar, setNameAgregar] = useState('');

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

  const actualizarAutor = () => {
    try {
      let token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let author_id = author_idEditar;
      axios
        .put(
          `${ENDPOINT.author}/${author_id}`,
          { name: nameEditar },
          { headers }
        )
        .then((response) => {
          ObtenerAutoresTodosAPI();
          limpiarEditar();
          alertify.success('Autor actualizado exitosamente');
        })
        .catch((error) => {
          console.log(error);
          alertify.error('Error al actualizar autor');
        });
    } catch (error) {
      alertify.error('Error al actualizar autor');
      console.log(error);
    }
  };

  const limpiarEditar = () => {
    setNameEditar('');
    setAuthor_idEditar(0);
  };

  const agregarAutor = () => {
    try {
      let token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(`${ENDPOINT.author}`, { name: nameAgregar }, { headers })
        .then((response) => {
          ObtenerAutoresTodosAPI();
          limpiarAgregar();
          alertify.success('Autor agregado exitosamente');
        })
        .catch((error) => {
          console.log(error);
          alertify.error('Error al agregar autor');
        });
    } catch (error) {
      alertify.error('Error al agregar autor');
      console.log(error);
    }
  };
  const limpiarAgregar = () => {
    setNameAgregar('');
  };

  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center">Mantenedor Autores</h1>
      <div className="flex justify-center pl-8 mt-4 mb-4">
        <Button
          size="sm"
          className="bg-blue-500"
          onClick={() => {
            setOpenAgregar(true);
          }}
        >
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
                      setAuthor_idEditar(author.author_id);
                      setNameEditar(author.name);
                      setOpenEditar(true);
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

      <Dialog
        id="dialogAdd"
        title={'Agregar autor'}
        content={
          <form>
            <div className="field-wrapper">
              <fieldset className="fieldset">
                <Label htmlFor="nombreAutor">Nombre</Label>
                <Input
                  id="nombreAutor"
                  required
                  type="text"
                  value={nameAgregar || ''}
                  onChange={(e) => setNameAgregar(e.target.value)}
                />
              </fieldset>
            </div>
          </form>
        }
        textoBoton2={'Cancelar'}
        textoBoton1={'Guardar'}
        open={openAgregar}
        setOpen={setOpenAgregar}
        accionBoton1={agregarAutor}
        accionBoton2={limpiarAgregar}
      ></Dialog>

      <Dialog
        id="dialogEdit"
        title={'Editar autor'}
        content={
          <form>
            <div className="field-wrapper">
              <fieldset className="fieldset">
                <Label htmlFor="nombreAutor">Nombre</Label>
                <Input
                  id="nombreAutor"
                  required
                  type="text"
                  value={nameEditar || ''}
                  onChange={(e) => {
                    setNameEditar(e.target.value);
                  }}
                />
              </fieldset>
            </div>
          </form>
        }
        textoBoton2={'Cancelar'}
        textoBoton1={'Guardar'}
        accionBoton1={actualizarAutor}
        open={openEditar}
        setOpen={setOpenEditar}
      ></Dialog>
    </div>
  );
};

export default AdminAuthors;
