/* eslint-disable react/prop-types */
import { ECommerceContext } from '@/Context/ECommerceContext';
import { useState, useEffect } from 'react';

export const ECommerceProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [genres, setGenres] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const addToCart = (book) => {
    setCart([...cart, book]);
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

  const getUsers = async () => {
    try {
      const response = await fetch('data/data.json');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const getGenres = async () => {
    try {
      const response = await fetch('data/genres.json');
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const getBookGenres = async () => {
    try {
      const response = await fetch('data/bookGenres.json');
      const data = await response.json();
      setBookGenres(data);
    } catch (error) {
      console.error('Error fetching book genres:', error);
    }
  };

  const handleLogin = (user) => {
    setAuthenticatedUser(user);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
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
    getUsers();
    getGenres();
    getBookGenres();

  }, []);

  return (
    <ECommerceContext.Provider
      value={{
        cart,
        setCart,
        book,
        setBook,
        addToCart,
        books,
        setBooks,
        authors,
        setAuthors,
        ratings,
        authenticatedUser,
        users,
        handleLogin,
        handleLogout,
        genres,
        booksAuthors,
        bookGenres,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
