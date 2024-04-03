/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { ECommerceContext } from '../../Context/ECommerceContext';
import { useParams } from 'react-router-dom';
import Productdetail from '../Productdetail';
import axios from 'axios';
import { ENDPOINT } from '../../config/constants';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [genre, setGenre] = useState({});
  const [author, setAuthor] = useState({});

  /**Implementar getbook*/
  const obtenerLibroAPI = () => {
    try {
      axios
        .get(ENDPOINT.book + '/' + id)
        .then((response) => {
          setBook(response.data.data.book);
          setGenre(response.data.data.genre);
          setAuthor(response.data.data.author);
        })
        .catch((error) => {
          
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerLibroAPI();
  }, [id]);
  //obtenerLibroAPI();
  return (
    <div>
      <Productdetail book={book} genre={genre} author={author} />
    </div>
  );
};

export default BookDetail;
