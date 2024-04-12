/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';

const AdminGenres = () => {
  const { ObtenerGenerosTodosAPI, genresAll, setGenresAll } =
    useContext(ECommerceContext);
  const navigate = useNavigate();
  console.log('genresAll', genresAll);
  //const [genresAll, setGenresAll] = useState([]);

  /*const ObtenerGenerosTodosAPI = () => {
    try {
      axios
        .post(ENDPOINT.genre + '/all/', { timeout: 5000 })
        .then((response) => {
          //console.log(response.data.data.genres);
          console.log('genresAll', genresAll);
          setGenresAll(response.data.data.genres);
          console.log('genresAll', genresAll);
        })
        .catch((error) => {
          alertify.error('Error al obtener generos');
          console.log('Error al obtener generos:', error);
        });
    } catch (error) {
      alertify.error('Error al obtener generos');
      console.log('Error al obtener generos:', error);
    }
  }
*/

  useEffect(() => {
    //ObtenerGenerosTodosAPI();
  }, []);
  return (
    <div className="min-[768px]:w-full min-[768px]:h-full pb-8">
      <h1 className="font-bold text-xl text-center">Mantenedor Géneros</h1>
      <div
        className="flex justify-center pl-8 mt-4 mb-4"
        onClick={() => navigate('/managergenres/add')}
      >
        <Button size="sm" className="bg-blue-500">
          Añadir Género
        </Button>
      </div>
      <div className="pl-8 pr-8 overflow-x-auto">
        <table className="table table-fixed w-full text-center border border-gray-300 rounded">
          <thead className="bg-blue-800 text-white mt-4 ">
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad Libros</th>
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
                <td className="w-1/12">0</td>
                <td className="flex justify-center">
                  <Button
                    size="sm"
                    className="m-auto bg-yellow-500 hover:bg-yellow-800  p-2"
                    onClick={() => {
                      navigate('/managergenres/edit/' + genre.id);
                    }}
                  >
                    Editar
                  </Button>
                  {genre.deleted ? (
                    <Button
                      size="sm"
                      className="m-auto bg-green-500 hover:bg-green-800  pl-4 pr-4"
                      onClick={() => {
                        navigate('/managergenres/activate/' + genre.id);
                      }}
                    >
                      Activar
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="m-auto bg-red-500 hover:bg-red-800 p-2"
                      onClick={() => {
                        navigate('/managergenres/deactivate/' + genre.id);
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

export default AdminGenres;
