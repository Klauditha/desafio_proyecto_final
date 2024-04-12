/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import Bookcard from '../../Bookcard';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../../../config/constants';

const AdminBooks = () => {
  const { searchBooks, setBookFound } = useContext(ECommerceContext);
  const [booksAdmin, setBookAmin] = useState([]);
  const navigate = useNavigate();

  const obtenerLibrosAPI = async () => {
    try {
      let filteredBooksResult = [];
      if (searchBooks != '') {
        booksAdmin.map((book) => {
          if (
            searchBooks != '' &&
            book.title.toLowerCase().includes(searchBooks.toLowerCase())
          ) {
            filteredBooksResult.push(book);
          }
        });
        setBookAmin(filteredBooksResult);
      } else {
        axios.post(ENDPOINT.book + '/all').then((res) => {
          setBookAmin(res.data.data.books);
        });
      }
    } catch (error) {
      console.log(error);
      alertify.error('Error al obtener libros');
    }
  };

  useEffect(() => {
    obtenerLibrosAPI();
    setBookFound([]);
  }, [searchBooks]);
  return (
    <div>
      <h1 className="font-bold text-xl text-center">Mantenedor Libros</h1>
      <div
        className="flex justify-center pl-8 mt-4 mb-4"
        onClick={() => navigate('/managerbooks/add')}
      >
        <Button size="sm" className="bg-blue-500">
          Añadir libro
        </Button>
      </div>
      <div className="grid grid-auto-cols gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 w-full justify-space-between">
        {booksAdmin
          ? booksAdmin.map((book) => (
              <Bookcard
                key={book.book_id}
                book={book}
                btnEditBook={true}
                btnDeleteBook={false}
                displayLanguage={true}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminBooks;
