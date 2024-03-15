/* eslint-disable react/prop-types */
import { ECommerceContext } from './ECommerceContext';
import { useState, useEffect } from 'react';

export const ECommerceProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const setWishlist = (book) => {
    console.log(book);
  };

  const getBooks = async () => {
      const response = await fetch("data/books.json");
      const data = await response.json();
      setBooks(data);
  }

  /*
  const getBooksAPI = async () => {
      
  }*/

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <ECommerceContext.Provider
      value={{ cart, setCart, book, setBook, addToCart, setWishlist, books, setBooks }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
