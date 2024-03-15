/* eslint-disable react/prop-types */
import { ECommerceContext } from './ECommerceContext';
import { useState, useEffect } from 'react';

export const ECommerceProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState([]);
  const [ratings, setRatings] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const setWishlist = (book) => {
    
  };

  const getBooks = async () => {
    const response = await fetch('data/books.json');
    const data = await response.json();
    data.map((book) => {
      book.author = '';
    });
    setBooks(data);
  };

  const getAuthorBook = (bookId) => {
    const authorId = booksAuthors.find(
      (bookAuthor) => bookAuthor.bookId === bookId
    ).authorId;
    const authorName = authors.find(
      (author) => author.authorId === authorId
    ).name;
    return authorName;
  };

  const setAuthorsBook = async () => {
    books.map((book) => {
      book.author = getAuthorBook(book.bookId);
    });
    setBooks(books);
  };

  const getAuthors = async () => {
    const response = await fetch('data/authors.json');
    const data = await response.json();
    setAuthors(data);
  };

  const getBooksAuthors = async () => {
    const response = await fetch('data/booksAuthors.json');
    const data = await response.json();
    setBooksAuthors(data);
  };

  const getRatings = async () => {
    const response = await fetch('data/ratings.json');
    const data = await response.json();
    setRatings(data);
  };

  /*
  const getBooksAPI = async () => {
      
  }*/

  useEffect(() => {
    getRatings();
    getBooksAuthors();
    getAuthors();
    getBooks();
    setAuthorsBook();
  }, []);

  return (
    <ECommerceContext.Provider
      value={{
        cart,
        setCart,
        book,
        setBook,
        addToCart,
        setWishlist,
        books,
        setBooks,
        authors,
        setAuthors,
        ratings,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
