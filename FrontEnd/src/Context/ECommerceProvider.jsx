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
  const [orderItems, setOrderItems] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [searchBooks, setSearchBooks] = useState('');
  const [searchPublishers, setSearchPublishers] = useState('');
  const [publishers, setPublishers] = useState(null);
  const [editoriales, setEditoriales] = useState(null);

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
    setAuthenticatedUser(user);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  const filterBySearch = () => {
    let filteredBooksResult = [];
    if (searchBooks != '' && searchPublishers != '') {
      getBooks();
      books.map((book) => {
        if (
          searchBooks != '' &&
          book.title.toLowerCase().includes(searchBooks.toLowerCase()) &&
          searchPublishers != '' &&
          book.publisher.toLowerCase().includes(searchPublishers.toLowerCase())
        ) {
          let valor = filteredBooksResult.find(
            (item) => item.bookId.toString() == book.bookId
          );
          if (!valor) filteredBooksResult.push(book);
        }
      });
      return filteredBooksResult;
    }
    if (searchBooks != '' && searchPublishers == '') {
      getBooks();
      books.map((book) => {
        if (
          searchBooks != '' &&
          book.title.toLowerCase().includes(searchBooks.toLowerCase()) &&
          searchPublishers == ''
        ) {
          let valor = filteredBooksResult.find(
            (item) => item.bookId.toString() == book.bookId.toString()
          );
          if (!valor) filteredBooksResult.push(book);
        }
      });
      return filteredBooksResult;
    }
    if (searchBooks == '' && searchPublishers != '') {
      getBooks();
      books.map((book) => {
        if (
          searchBooks == '' &&
          searchPublishers != '' &&
          book.publisher.toLowerCase().includes(searchPublishers.toLowerCase())
        ) {
          let valor = filteredBooksResult.find(
            (item) => item.bookId.toString() == book.bookId
          );
          if (!valor) filteredBooksResult.push(book);
        }
      });
      return filteredBooksResult;
    } else {
      getBooks();
      return books;
    }
  };

  const setDataPublishers = async () => {
    const response = await fetch('data/books.json');
    const data = await response.json();
    let publishers = [];
    data.map((book) => {
      publishers.push(book.publisher);
    });
    setEditoriales(publishers);
  };

  useEffect(() => {
    if (
      (searchBooks != '' && searchBooks != null && searchBooks != undefined) ||
      (searchPublishers != '' &&
        searchPublishers != null &&
        searchPublishers != undefined)
    ) {
      filterBySearch();
    }
    //  else if(searchPublishers != '') filterByPublisher(searchPublishers);
    //setDataPublishers();
    else {
      setDataPublishers();
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
    }
    //setDataPublishers();
  }, [searchBooks, searchPublishers]);

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
        registerUser,
        handleLogin,
        handleLogout,
        genres,
        booksAuthors,
        bookGenres,
        setBooksAuthors,
        setBookGenres,
        setSoldBook,
        searchBooks,
        publishers,
        setSearchBooks,
        setPublishers,
        editoriales,
        searchPublishers,
        setSearchPublishers,
        filterBySearch,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
