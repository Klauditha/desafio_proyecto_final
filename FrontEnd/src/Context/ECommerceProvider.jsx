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
  const addToCart = async (book, quantity) => {
    if (authenticatedUser) {
      try {
        let token = sessionStorage.getItem("token");
        let user_id = parseInt(sessionStorage.getItem("user_id"), 10);

        if (!token || isNaN(user_id)) {
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const existingCartItem = cart_items.find(
          (item) => item.book_id === book.book_id && item.user_id === user_id
        );

        if (existingCartItem) {
          const updatedQuantity =
            parseInt(existingCartItem.quantity, 10) + parseInt(quantity, 10);
          await axios.put(
            `${ENDPOINT.cart}/${existingCartItem.cart_item_id}`,
            {
              user_id,
              book_id: existingCartItem.book_id,
              deleted: false,
              quantity: updatedQuantity,
            },
            {
              headers,
            }
          );
          setCartItems(
            cart_items.map((item) => {
              if (item.cart_item_id === existingCartItem.cart_item_id) {
                return { ...item, quantity: updatedQuantity };
              }
              return item;
            })
          );
          alertify.success("Cantidad de copias en el carrito actualizada");
        } else {
          const response = await axios.post(
            ENDPOINT.cart,
            {
              user_id: user_id,
              book_id: book.book_id,
              quantity: quantity ? parseInt(quantity) : 1,
            },
            {
              headers,
            }
          );
          if (response.data.status) {
            const newCartItem = response.data.data.cart;
            setCartItems([...cart_items, newCartItem]);
            alertify.success("Libro agregado al carrito");
          } else {
            console.error("No se ha podido agregar libro al carrito");
          }
        }
      } catch (error) {
        console.error("Error al agregar libro al carrito:", error);
      }
    } else {
      console.log("Redirigiendo a login...");
      navigate("/login");
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


const fetchCartItems = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const user_id = parseInt(sessionStorage.getItem("user_id"), 10);

    if (!token || isNaN(user_id)) {
      console.error("Token o id de usuario invalidos.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${ENDPOINT.cart}/${user_id}`, {
      headers: headers,
    });
    const cartItems = response.data.data.cart;
    const cart_items = await Promise.all(
      cartItems.map(async (cartItem) => {
        const bookResponse = await axios.get(
          `${ENDPOINT.book}/${cartItem.book_id}&${user_id}`
        );
        const bookDetails = bookResponse.data.data;
        return { ...cartItem, book: bookDetails };
      })
    );

    setCartItems(cart_items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
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

  const updateCartItemQuantity = async (cart_item_id, book_id, newQuantity) => {
    try {
      let user_id = parseInt(sessionStorage.getItem("user_id"), 10);
      let token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        `${ENDPOINT.cart}/${cart_item_id}`,
        {
          user_id,
          book_id,
          deleted: false,
          quantity: newQuantity,
        },
        { headers }
      );
      const updatedCartItem = response.data.data.cartItem;

      setCartItems((cartItems) =>
        cartItems.map((item) =>
          item.cart_item_id === updatedCartItem.cart_item_id &&
          item.book_id === updatedCartItem.book_id
            ? { ...item, quantity: updatedCartItem.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error actualizando cantidad de item en el carrito:", error);
    }
  };

  const removeFromCart = async (cart_item_id, book_id) => {
    try {
      let user_id = parseInt(sessionStorage.getItem("user_id"), 10);
      let token = sessionStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
       await axios.delete(`${ENDPOINT.cart}/${cart_item_id}`, {
         headers,
         data: {
           user_id,
           book_id,
           deleted: true,
           quantity: 0,
         },
       });
      setCartItems(
        cartItems.filter((item) => item.cart_item_id !== cart_item_id)
      );
    } catch (error) {
      console.error("Error removiendo item del carrito:", error);
    }
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
    sessionStorage.removeItem('user_id');
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
    let user_id = '';
    
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
          user_id = userData.user_id;
          sessionStorage.setItem("user_id", user_id);
          setDataAuthenticatedUser(userData);
          fetchCartItems();
          fetchWishlistBooks();
        })
        .catch((error) => {
          navigate('/login');
          console.error('Error fetching user:', error);
        });
    }
  };

/* Obtener wishlist
*/
  const fetchWishlistBooks = async () => {
    let loggedUserId = sessionStorage.getItem('user_id');
  
    try {
      if (!loggedUserId) {
        console.error("Usuario no autentificado.");
        return;
      }
      const response = await axios.get(ENDPOINT.book + '/wishlist/' + loggedUserId);
      const data = response.data;

      if (data.status) {
        const wishlistBooks = data.data.wishlistBooks;
        return wishlistBooks;
      } else {
        console.error("Error consiguiendo libros de wishlist", data.message);
        return [];
      }
    } catch (error) {
    console.error("Error consiguiendo libros de wishlist:", error);
    return [];
    }
  };

 const handleAddToWishlist = async (book_id, wishlistStatus) => {
   let token = sessionStorage.getItem("token");
   let user_id = parseInt(sessionStorage.getItem("user_id"), 10);

   if (token) {
     const headers = {
       Authorization: `Bearer ${token}`,
     };

     axios
       .post(
         `${ENDPOINT.rating}/${book_id}/wishlist`,
         { user_id, wishlist: wishlistStatus },
         { headers }
       )
       .then((response) => {
         console.log("Response:", response.data);
         console.log("Wishlist actualizado exitosamente");
       })
       .catch((error) => {
         console.error("Error:", error);
         console.error("No se ha podido actualizar wishlist");
       });
   } else {
     console.error("Token no encontrado");
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
    let user_id = 0;
    if (dataAuthenticatedUser) {
      user_id = dataAuthenticatedUser.user_id;
    }
    try {
      axios
      .get(ENDPOINT.book + '/' + book_id + '&' + user_id)
        .then((response) => {
          setBookFound(response.data.data.book);
          setGenreFound(response.data.data.genre);
          setAuthorFound(response.data.data.author);
          
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
        /*Wishlist */
        fetchWishlistBooks,
        /*Data admin edit*/
        bookFound,
        setBookFound,
        authorFound,
        setAuthorFound,
        genreFound,
        setGenreFound,
        obtenerLibroAdminAPI,
        handleAddToWishlist,
        fetchCartItems,
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
