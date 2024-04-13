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

const AdminGenres = () => {
  const { ObtenerGenerosTodosAPI, genresAll } = useContext(ECommerceContext);
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [nameEditar, setNameEditar] = useState('');
  const [genre_idEditar, setGenre_idEditar] = useState(0);
  const [nameAgregar, setNameAgregar] = useState('');


  const activarGenero = (genre_id) => {
    alertify
      .confirm(
        'Activar Genero',
        '¿Seguro que quieres activar este genero?',
        function () {
          try {
            let token = sessionStorage.getItem('token');
            const headers = {
              Authorization: `Bearer ${token}`,
            };
            axios
              .put(`${ENDPOINT.genre}/activate/${genre_id}`, {}, { headers })
              .then((response) => {
                ObtenerGenerosTodosAPI();
                alertify.success('Genero activado exitosamente');
              })
              .catch((error) => {
                console.log(error);
                alertify.error('Error al activar genero');
              });
          } catch (error) {
            console.log(error);
            alertify.error('Error al activar genero');
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

  const desactivarGenero = (genre_id) => {
    alertify
      .confirm(
        'Desactivar Genero',
        '¿Seguro que quieres desactivar este genero?',
        function () {
          try {
            let token = sessionStorage.getItem('token');
            axios
              .delete(`${ENDPOINT.genre}/${genre_id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                ObtenerGenerosTodosAPI();
                alertify.success('Genero desactivado exitosamente');
              })
              .catch((error) => {
                console.log(error);
                alertify.error('Error al desactivar genero');
              });
          } catch (error) {
            alertify.error('Error al desactivar genero');
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

  const actualizarGenero = () => {
    try {
      let token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      let genre_id = genre_idEditar;
      axios
        .put(`${ENDPOINT.genre}/${genre_id}`, { name: nameEditar }, { headers })
        .then((response) => {
          ObtenerGenerosTodosAPI();
          limpiarEditar();
          alertify.success('Genero actualizado exitosamente');
        })
        .catch((error) => {
          console.log(error);
          alertify.error('Error al actualizar genero');
        });
    } catch (error) {
      alertify.error('Error al actualizar genero');
      console.log(error);
    }
  };

  const limpiarEditar = () => {
    setNameEditar('');
    setGenre_idEditar(0);
  };

  const agregarGenero = () => {
    try {
      let token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(`${ENDPOINT.genre}`, { name: nameAgregar }, { headers })
        .then((response) => {
          ObtenerGenerosTodosAPI;
          limpiarAgregar();
          alertify.success('Genero agregado exitosamente');
        })
        .catch((error) => {
          console.log(error);
          alertify.error('Error al agregar genero');
        });
    } catch (error) {
      alertify.error('Error al agregar genero');
      console.log(error);
    }
  };
  const limpiarAgregar = () => {
    setNameAgregar('');
  };

  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center">Mantenedor Géneros</h1>
      <div className="flex justify-center pl-8 mt-4 mb-4">
        <Button
          size="sm"
          className="bg-blue-500"
          onClick={() => setOpenAgregar(true)}
        >
          Añadir Género
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
            {genresAll.map((genre) => (
              <tr
                className="text-center border border-gray-300"
                key={genre.genre_id}
              >
                <td>{genre.genre_id}</td>
                <td className="w-1/12 text-left">{genre.name}</td>
                <td className="w-1/12">{genre.quantitybook}</td>
                <td className="flex justify-center">
                  <Button
                    size="sm"
                    className="m-auto bg-yellow-500 hover:bg-yellow-800  p-2"
                    onClick={() => {
                      setGenre_idEditar(genre.genre_id);
                      setNameEditar(genre.name);
                      setOpenEditar(true);
                    }}
                  >
                    Editar
                  </Button>
                  {genre.deleted ? (
                    <Button
                      size="sm"
                      className="m-auto bg-green-500 hover:bg-green-800  pl-4 pr-4"
                      onClick={() => {
                        activarGenero(genre.genre_id);
                      }}
                    >
                      Activar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="m-auto bg-red-500 hover:bg-red-800 p-2"
                      onClick={() => {
                        desactivarGenero(genre.genre_id);
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
        title={'Agregar genero'}
        content={
          <form>
            <div className="field-wrapper">
              <fieldset className="fieldset">
                <Label htmlFor="nombreAutor">Nombre</Label>
                <Input
                  id="nombreGenero"
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
        accionBoton1={agregarGenero}
        accionBoton2={limpiarAgregar}
      ></Dialog>

      <Dialog
        id="dialogEdit"
        title={'Editar genero'}
        content={
          <form>
            <div className="field-wrapper">
              <fieldset className="fieldset">
                <Label htmlFor="nombreAutor">Nombre</Label>
                <Input
                  id="nombreGenero"
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
        accionBoton1={actualizarGenero}
        open={openEditar}
        setOpen={setOpenEditar}
      ></Dialog>
    </div>
  );
};

export default AdminGenres;
