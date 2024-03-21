import { useContext } from 'react';
import { ECommerceContext } from '@/Context/ECommerceContext';

const CartItem = () => {
  const {
    cart_items,
    getBookDetailsById,
    updateCartItemQuantity,
    removeFromCart,
  } = useContext(ECommerceContext);

  
  const handleIncrement = (book) => {
    const cartItem = cart_items.find((item) => item.book_id === book.book_id);
    if (cartItem) {
      const newQuantity = cartItem.quantity + 1;
      updateCartItemQuantity(cartItem.cart_item_id, newQuantity);
    }
  };

  const handleDecrement = (book) => {
    const cartItem = cart_items.find((item) => item.book_id === book.book_id);
    if (cartItem && cartItem.quantity > 1) {
      const newQuantity = cartItem.quantity - 1;
      updateCartItemQuantity(cartItem.cart_item_id, newQuantity);
    }
  };

  const handleRemove = (cartItem) => {
    removeFromCart(cartItem.cart_item_id);
  };

  return (
    <>
      {cart_items
        ? cart_items.map((cartItem) => {
            const book = getBookDetailsById(cartItem.book_id);
            return (
              <div
                key={cartItem.cart_item_id}
                className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-200 dark:border-gray-800 px-4 md:px-20"
              >
                <div className="flex flex-col items-center md:flex-row gap-4">
                  <img
                    alt={book.title}
                    className="aspect-[9-16] object-cover border border-gray-200 rounded-lg overflow-hidden dark:border-gray-800"
                    height={200}
                    src={book.img}
                    width={130}
                  />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-balance text-center">
                      {book.title}
                    </h2>
                    <h2 className="text-2xl font-semibold text-center md:text-left">
                      $ {book.price.toLocaleString('es-CL')}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleDecrement(cartItem)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => handleIncrement(cartItem)}>+</button>
                  <button onClick={() => handleRemove(cartItem)}>
                    Remover
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </>
  );
};

export default CartItem;
