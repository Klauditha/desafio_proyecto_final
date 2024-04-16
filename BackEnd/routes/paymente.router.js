const router = require('express').Router();
const { STRIPE_SECRET_KEY, CLIENT_URL } = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

router.post(
  '/create-checkout-session',
  async (req, res, next) => {
    const { cart } = req.body;

    let line_items = [];

    if (cart.length) {
      try {
        line_items = cart.map((item) => {
          return {
            price_data: {
              currency: 'clp',
              unit_amount: item[0].price,
              product_data: {
                name: item[0].name,
              },
            },
            quantity: item[0].quantity,
          };
        });
      } catch (error) {
        console.log(error);
      }
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: line_items,
      mode: 'payment',
      //return_url: `${CLIENT_URL}/paymentsuccess/session_id=${process.env.STRIPE_SECRET_KEY}}`,
      return_url: `${CLIENT_URL}/paymentsuccess/${process.env.STRIPE_SECRET_KEY}}`,
      //success_url: `${CLIENT_URL}/paymentsuccess`,
      //cancel_url: `${CLIENT_URL}/`,
      //return_url: `${CLIENT_URL}/paymentsuccess/session_id=${process.env.STRIPE_SECRET_KEY}}`
      //return_url: `${CLIENT_URL}/paymentsuccess/session_id=${session.id}`,
      //return_url: `${CLIENT_URL}/pa`,
    });

    //return { session: session.id };
    res.send({ clientSecret: session.client_secret });
  }

  //const session = await stripe.checkout.sessions.retrieve(session_id);

  //res.send({ clientSecret: session.client_secret });
);

router.get('/session-status', async (req, res, next) => {
  console.log('req.query', req.query);
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session) {
      res.send({
        status: session.status,
        customer_email: session.customer_details.email,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
