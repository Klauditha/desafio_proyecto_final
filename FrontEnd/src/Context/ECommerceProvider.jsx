/* eslint-disable react/prop-types */
import { ECommerceContext } from '@/Context/ECommerceContext';
import React, { useState, useEffect } from "react";

export const ECommerceProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [cart_items, setCartItems] = useState([]);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [genres, setGenres] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const getAuthorBook = (bookId) => {
    const authorId = booksAuthors.find(
      (bookAuthor) => bookAuthor.bookId == bookId
    );
    const authorName = authors.find(
      (author) => author.authorId == authorId?.authorId
    );
    return authorName?.name;
  };

  const getSoldBook = (bookId) => {
    let sold = 0;
    orderItems.map((orderItem) => {
      if (orderItem.book_id == bookId) {
        sold = sold + orderItem?.quantity;
      }
    });

    return sold;
  };

  const fetchCartItems = async () => {
    try {
      if (!authenticatedUser) {
        console.error("Usuario no autentificado.");
        return;
      }

      console.log("Fetching los carritos del usuario...");
       const cartsResponse = await fetch("data/data.json");
      const data = await cartsResponse.json();
      const userCart = data.carts.find(
        (cart) => cart.user_id === authenticatedUser.user_id
      );

      if (!userCart) {
        console.error("Carrito del usuario no encontrado.");
        return;
      }

      console.log("Carrito del usuario encontrado:", userCart);

      console.log("Fetching items del carrito...");
      const cartItemsResponse = await fetch("data/data.json");
      const cartItemsData = await cartItemsResponse.json();
      const userCartItems = cartItemsData.cart_items.filter(
        (item) => item.cart_id === userCart.cart_id
      );

      console.log("Items del carrito del usuario:", userCartItems);

      setCartItems(userCartItems);
    } catch (error) {
      console.error("Error haciendo fetch a los items del carrito:", error);
    }
  };

  
  const fetchData = async () => {
    try {
      const response = await fetch("data/data.json");
      const data = await response.json();
      const booksData = data.books;
      setBooksData(booksData);
      return booksData;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
  };

  const getBookDetailsById = (bookId) => {
    const foundBook = booksData.find((book) => book.book_id === bookId);
    if (foundBook) {
      return foundBook;
    } else {
      console.error(`Libro de ID ${bookId} no encontrado.`);
      return null;
    }
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => { //No modifican valores JSON
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.cart_item_id === cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    const updatedCartItems = cart_items.filter(
      (item) => item.cart_item_id !== cartItemId
    );

    setCartItems(updatedCartItems);
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

  const getOrderItems = async () => {
    try {
      const response = await fetch('data/orderItems.json');
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.error('Error fetching order items:', error);
    }
  };

  const getBooks = async () => {
    const response = await fetch('data/books.json');
    const data = await response.json();
    data.map((book) => {
      book.author = getAuthorBook(book.bookId);
      book.sold = getSoldBook(book.bookId);
      book.wishlist = false;
    });
    setBooks(data);
  };

 
  const registerUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  
  const setAuthorsBook = async () => {
    books.map((book) => {
      book.author = getAuthorBook(book.bookId);
    });
    setBooks(books);
  };

  const setSoldBook = async () => {
    books.map((book) => {
      book.sold = getSoldBook(book.bookId);
    });
    setBooks(books);
  };
const handleLogin = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
  setAuthenticatedUser(user);
};

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  useEffect(() => {
    getBooksAuthors();
    getOrderItems();
    getRatings();
    getAuthors();
    getUsers();
    getGenres();
    getBookGenres();
    getBooks();
    setAuthorsBook();
    setSoldBook();
    setBooks();
    removeFromCart();
    fetchData().then((booksData) => {
      if (authenticatedUser) {
        console.log("Fetching cart items...");
        fetchCartItems();
      }
    });
  }, [authenticatedUser]);

  return (
    <ECommerceContext.Provider
      value={{
        cart,
        setCart,
        book,
        setBook,
        addToCart,
        cart_items,
        books,
        setBooks,
        authors,
        setAuthors,
        ratings,
        authenticatedUser,
        users,
        registerUser,
        handleLogin,
        handleLogout,
        genres,
        booksAuthors,
        bookGenres,
        setBooksAuthors,
        setBookGenres,
        setSoldBook,
        orders,
        setOrders,
        getBookDetailsById,
        updateCartItemQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
