import { useContext, useEffect, useState } from "react";
import { ECommerceContext } from "@/Context/ECommerceContext";
import IncrementDecrementBtn from "./Incrementbutton";
import { Button } from "./ui/button";

const CartItem = () => {
  const { cart_items, updateCartItemQuantity, fetchCartItems } =
    useContext(ECommerceContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await fetchCartItems();
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchCart();
    }
  }, [fetchCartItems, loading]);

  const handleIncrement = (book) => {
    const cartItem = cart_items.find((item) => item.book_id === book.book_id);
    if (cartItem) {
      const newQuantity = parseInt(cartItem.quantity, 10) + 1;
      const cart_item_id = parseInt(cartItem.cart_item_id, 10);
      updateCartItemQuantity(cart_item_id, cartItem.book_id, newQuantity);
    }
  };

  const handleDecrement = (book) => {
    const cartItem = cart_items.find((item) => item.book_id === book.book_id);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = parseInt(cartItem.quantity, 10) - 1;
      const cart_item_id = parseInt(cartItem.cart_item_id, 10);
      updateCartItemQuantity(cart_item_id, cartItem.book_id, newQuantity);
    }
  };

  const handleRemove = async (cartItem) => {
    try {
      const newQuantity = 0;
      await updateCartItemQuantity(
        cartItem.cart_item_id,
        cartItem.book_id,
        newQuantity
      );
      await fetchCartItems();
      alertify.success("Libro removido");
    } catch (error) {
      console.error("Error removiendo item del carrito:", error);
    }
  };

  if (!cart_items || cart_items.length === 0) {
    return <p>No hay libros en el carrito.</p>;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Cargando libros del carrito...</p>
        </div>
      ) : (
        <>
          {cart_items && cart_items.length > 0 ? (
            cart_items.map((cartItem) => {
              const { book, quantity } = cartItem;
              return (
                <div
                  key={cartItem.cart_item_id}
                  className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-200 dark:border-gray-800 px-4 md:px-20"
                >
                  <div className="flex flex-col items-center md:flex-row gap-4">
                    <img
                      alt={book.book.title}
                      className="aspect-[9-16] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                      height={200}
                      src={book.book.img}
                      width={130}
                    />
                    <div className="flex flex-col justify-center">
                      <h2 className="text-2xl font-semibold text-balance text-center">
                        {book.book.title}
                      </h2>
                      <h2 className="text-2xl font-semibold text-center md:text-left">
                        $ {book.book.price.toLocaleString("es-CL")}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleDecrement(cartItem)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleIncrement(cartItem)}>+</button>
                    <button onClick={() => handleRemove(cartItem)}>
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Sin libros en el carrito.</p>
          )}
        </>
      )}
    </>
  );
};

export default CartItem;
