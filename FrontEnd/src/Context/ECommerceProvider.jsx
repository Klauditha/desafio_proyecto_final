/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { ECommerceContext } from '@/Context/ECommerceContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ENDPOINT } from '../config/constants';
import SearchBook from '@/components/pages/SearchBook';

export const ECommerceProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);
  const [cart_items, setCartItems] = useState([]);
  const [book, setBook] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState([]);
  const [bookGenres, setBookGenres] = useState([]);
  const [authenticatedUser, setAuthenticatedUser] = useState([]); //Almacena el correo del usuario autenticado
  const [dataAuthenticatedUser, setDataAuthenticatedUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchBooks, setSearchBooks] = useState('');
  const [searchPublishers, setSearchPublishers] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [editoriales, setEditoriales] = useState(null);
  const [booksNews, setBooksNews] = useState([]);
  const [booksEditoriales, setBooksEditoriales] = useState([]);
  const [booksMasVendidos, setBooksMasVendidos] = useState([]);
  const [bookFound, setBookFound] = useState({});
  const [authorFound, setAuthorFound] = useState({});
  const [genreFound, setGenreFound] = useState({});

  /* CARRITO */
  const addToCart = async (book) => {
    // Funcionalidad POST con servidor para futuro
    console.log(
      'Intentando agregar libro al carro antes de autenticación de usuario:',
      book
    );

    if (authenticatedUser) {
      try {
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: authenticatedUser.userId,
            bookId: book.bookId,
          }),
        });

        if (response.ok) {
          console.log('Libro correctamente agregado al carro del servidor');
          setCart([...cart, book]);
          console.log('Carrito actualizado:', cart);
          fetchCartItems();
        } else {
          console.error('Fallo al agregar libro al carrito en el servidor');
        }
      } catch (error) {
        console.error('Error agregar libro al carro:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const addCartLocal = (book, quantity) => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      try {
        const newCart = {
          cart_item_id: cart_items.length + 1,
          cart_id: cart_items[0].cart_id,
          book_id: parseInt(book.bookId),
          quantity: quantity ? parseInt(quantity) : 1,
          deleted: false,
        };

        cart_items.push(newCart);
        alertify.success('Libro agregado al carrito');
      } catch (error) {
        console.log(error);
        alertify.error('Error al agregar libro al carrito');
      }
    } else {
      navigate('/login');
    }
  };

  /**
   * Obtiene la cantidad de libros vendidos de un libro concreto
   * @param {*} bookId
   * @returns
   */
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
      let user = JSON.parse(sessionStorage.getItem('user'));

      if (!user) {
        console.error('Usuario no autentificado.');
        return;
      }

      console.log('Fetching los carritos del usuario...');
      const cartsResponse = await fetch('data/data.json');
      const data = await cartsResponse.json();
      const userCart = data.carts.find((cart) => cart.user_id === user.user_id);

      if (!userCart) {
        console.error('Carrito del usuario no encontrado.');
        return;
      }

      console.log('Carrito del usuario encontrado:', userCart);

      console.log('Fetching items del carrito...');
      const cartItemsResponse = await fetch('data/data.json');
      const cartItemsData = await cartItemsResponse.json();
      const userCartItems = cartItemsData.cart_items.filter(
        (item) => item.cart_id === userCart.cart_id
      );

      console.log('Items del carrito del usuario:', userCartItems);

      setCartItems(userCartItems);
    } catch (error) {
      console.error('Error haciendo fetch a los items del carrito:', error);
    }
  };

  /*
  const fetchData = async () => {
    try {
      //const response = await fetch('data/data.json');
      const response = await fetch("data/books.json");
      const data = await response.json();
      const booksData = [];
      data.books.map((book) => {
        let newBook = {
          book_id: book.book_id,
          deleted: false,
          title: book.title,
          author: book.author,
          description: book.description,
          price: book.price,
          publisher: book.publisher,
          publication_date: book.publication_date,
          image: book.image,
        };
        booksData.push({
          ...book,
          newBook,
        });
      });
      //const booksData = data.books;
      setBooksData(booksData);
      return booksData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
*/
  const getBookDetailsById = (bookId) => {
    const foundBook = books.find((book) => book.bookId == bookId);
    if (foundBook) {
      return foundBook;
    } else {
      console.error(`Libro de ID ${bookId} no encontrado.`);
      return null;
    }
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    //No modifican valores JSON
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

  const registerUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const setSoldBook = async () => {
    books.map((book) => {
      book.sold = getSoldBook(book.bookId);
    });
    setBooks(books);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setAuthenticatedUser(null);
  };

  const setDataEditoriales = async () => {
    axios
      .post(ENDPOINT.book + '/allPublishers/')
      .then((response) => {
        setEditoriales(response.data.data.publishes);
      })
      .catch((error) => {
        console.log('Error al obtener editoriales:', error);
        setEditoriales([]);
      });
  };

  /*Obtiene el usuario autenticado mediante la sesion, 
  llama a la api y setea el usuario en DataUserAuth
   */
  const setearDataUserAuth = () => {
    let username = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');

    if (username && token) {
      axios
        .get(
          ENDPOINT.users +
            '/byusername/' +
            JSON.parse(sessionStorage.getItem('username'))['email'],
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        .then((response) => {
          const userData = response.data.data.user;
          setDataAuthenticatedUser(userData);
        })
        .catch((error) => {
          navigate('/login');
          console.error('Error fetching user:', error);
        });
    }
  };

  const fetchWishlist = () => {
    let username = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');

    if (username && token) {
      axios
        .get(ENDPOINT.rating + '/wishlist', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          const wishlistData = response.data.data.wishlist;
          console.log('Wishlist data:', wishlistData);
          setWishlist(wishlistData);
        })
        .catch((error) => {
          navigate('/login');
          console.error('Error fetching wishlist:', error);
        });
    }
  };

  /*Obtener novedades de libros */
  const obtenerNovedadesLibros = () => {
    axios
      .post(ENDPOINT.book + '/news/')
      .then((response) => {
        if (searchBooks != '') {
          let filteredBooksResult = [];
          response.data.data.books.map((book) => {
            if (
              searchBooks != '' &&
              book.title.toLowerCase().includes(searchBooks.toLowerCase())
            ) {
              let valor = filteredBooksResult.find(
                (item) => item.book_id.toString() == book.book_id
              );
              if (!valor) filteredBooksResult.push(book);
            }
          });
          setBooksNews(filteredBooksResult);
        } else {
          setBooksNews(response.data.data.books);
        }
      })
      .catch((error) => {
        console.log('Error al obtener novedades de libros:', error);
      });
  };

  const obtenerLibrosPorEditorial = (publisher = '') => {
    try {
      axios
        .post(ENDPOINT.book + '/byPublisher/', {
          publisher: publisher,
        })
        .then((response) => {
          if (searchBooks != '') {
            let filteredBooksResult = [];
            response.data.data.books.map((book) => {
              if (
                searchBooks != '' &&
                book.title.toLowerCase().includes(searchBooks.toLowerCase())
              ) {
                filteredBooksResult.push(book);
              }
            });
            setBooksEditoriales(filteredBooksResult);
          } else {
            setBooksEditoriales(response.data.data.books);
          }
        })
        .catch((error) => {
          alertify.error('Error al obtener libros por editorial ');
          console.log('Error al obtener libros por editorial:', error);
        });
    } catch (error) {
      alertify.error('Error al obtener libros por editorial ');
      console.log('Error al obtener libros por editorial:', error);
    }
  };

  const obtenerLibrosMasVendidos = () => {
    if (searchBooks != '' && booksMasVendidos.length > 0) filtrarMasVendidos();
    else {
      try {
        axios
          .post(ENDPOINT.book + '/moresold/', { timeout: 5000 })
          .then((response) => {
            setBooksMasVendidos(response.data.data.books);
          })
          .catch((error) => {
            alertify.error('Error al obtener libros más vendidos');
            console.log('Error al obtener libros más vendidos:', error);
          });
      } catch (error) {
        alertify.error('Error al obtener libros mas vendidos');
        console.log('Error al obtener libros más vendidos:', error);
      }
    }

    //console.log('booksMasVendidos', booksMasVendidos);
  };

  const filtrarMasVendidos = () => {
    try {
      let filteredBooksResult = [];
      booksMasVendidos.map((book) => {
        if (searchBooks != '') {
          if (
            searchBooks != '' &&
            book.title.toLowerCase().includes(searchBooks.toLowerCase())
          ) {
            filteredBooksResult.push(book);
          }
          setBooksMasVendidos(filteredBooksResult);
        }
      });
    } catch (error) {
      alertify.error('Error al obtener libros mas vendidos');
      console.log('Error al obtener libros más vendidos:', error);
    }
  };

  const ObtenerAutoresActivos = () => {
    try {
      axios
        .post(ENDPOINT.author + '/allActive/', { timeout: 5000 })
        .then((response) => {
          setAuthors(response.data.data.authors);
        })
        .catch((error) => {
          alertify.error('Error al obtener autores');
          console.log('Error al obtener autores:', error);
        });
    } catch (error) {
      alertify.error('Error al obtener autores');
      console.log('Error al obtener autores:', error);
    }
  };

  const ObtenerGenerosActivos = () => {
    try {
      axios
        .post(ENDPOINT.genre + '/allActive/', { timeout: 5000 })
        .then((response) => {
          setGenres(response.data.data.genres);
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
  const obtenerLibroAdminAPI = (book_id) => {
    try {
      axios
        .get(ENDPOINT.book + '/' + book_id)
        .then((response) => {
          setBookFound(response.data.data.book);
          setGenreFound(response.data.data.genre);
          setAuthorFound(response.data.data.author);
          
          //if (!estadoCarga) 
          //setearDatosEdicion(bookFound);
        })
        .catch((error) => {
          console.log(error);
          alertify.error(
            'No se ha podido obtener el libro. Por favor, inténtelo de nuevo.'
          );
        });
    } catch (error) {
      alertify.error(
        'No se ha podido obtener el libro. Por favor, inténtelo de nuevo.'
      );
      console.log(error);
      
    }

  };

  useEffect(() => {
    setDataEditoriales();
    ObtenerAutoresActivos();
    ObtenerGenerosActivos();
    //obtenerLibroAdminAPI();
    //getUsers();
    removeFromCart();
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
        authenticatedUser,
        users,
        registerUser,
        handleLogout,
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
        searchBooks,
        //publishers,
        setSearchBooks,
        //setPublishers,
        searchPublishers,
        setSearchPublishers,

        addCartLocal,
        /*Proceso de autenticacion*/
        setAuthenticatedUser,
        dataAuthenticatedUser,
        setDataAuthenticatedUser,
        setearDataUserAuth,
        /*Novedades*/
        booksNews,
        obtenerNovedadesLibros,
        wishlist,
        /*Listado editoriales */
        editoriales,
        /*Libros por editorial*/
        booksEditoriales,
        setBooksEditoriales,
        obtenerLibrosPorEditorial,
        /* Libros mas vendidos */
        booksMasVendidos,
        obtenerLibrosMasVendidos,
        filtrarMasVendidos,
        /*Autores*/
        authors,
        setAuthors,
        /*Generos  */
        genres,
        setGenres,
        /*Data admin edit*/
        bookFound,
        setBookFound,
        authorFound,
        setAuthorFound,
        genreFound,
        setGenreFound,
        obtenerLibroAdminAPI,
        
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
