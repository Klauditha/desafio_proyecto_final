/* eslint-disable no-undef */
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
  const [rating, setRating] = useState(0);
  const [wishlist, setWishlist] = useState(null);
  const {dataAuthenticatedUser} = useContext(ECommerceContext);
 

  const obtenerLibroAPI = () => {
    let user_id = 0;
    if (dataAuthenticatedUser) {
      user_id = dataAuthenticatedUser.user_id;
    }
    try {
      axios
        .get(ENDPOINT.book + '/' + id + '&' + user_id)
        .then((response) => {
          setBook(response.data.data.book);
          setGenre(response.data.data.genre);
          setAuthor(response.data.data.author);
          setWishlist(response.data.data.wishlist);
          obtenerRatingAPI(response.data.data.book.book_id);
        })
        .catch((error) => {
          console.log(error);
          alertify.error(
            'No se ha podido obtener el libro. Por favor, inténtelo de nuevo.')
        });
    } catch (error) {
      alertify.error(
        'No se ha podido obtener el libro. Por favor, inténtelo de nuevo.')
      console.log(error);
    }
  };

  const obtenerRatingAPI = (book_id) => {
    try {
      axios
        .get(ENDPOINT.rating + '/' + book_id)
        .then((response) => {
          setRating(response.data.data.rating);
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
      <Productdetail book={book} genre={genre} author={author} rating={rating} wishlist={wishlist}/>
    </div>
  );
};

export default BookDetail;
