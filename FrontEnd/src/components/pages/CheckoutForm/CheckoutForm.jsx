/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback } from 'react';
import { ECommerceContext } from '../../../Context/ECommerceContext';
import { useContext } from 'react';

const CheckoutForm = () => {
  const { cartItemsCheckout } = useContext(ECommerceContext);

  const cart = cartItemsCheckout;
  const stripePromise = loadStripe(
    'pk_test_51P5JFYFCCWAJD1bJPPv5JHwyJOcFYnf2I8dHQ3j2A8F0HgqlgZpssWhjg9THowV1NyHDOd5vBEN9TpltvAoNiR1o00QtL1bMEG'
  );

  const fetchClientSecret = useCallback(() => {
    return fetch(`${process.env.URL_API}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => clientSecret)
      .catch((err) => console.log(err));
  }, []);

  const options = { fetchClientSecret };
  console.log(options);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
