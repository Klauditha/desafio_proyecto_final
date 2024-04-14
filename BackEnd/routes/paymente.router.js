const router = require('express').Router()
const { STRIPE_SECRET_KEY, CLIENT_URL } = process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY)

router.post('/create-checkout-session', async (req, res, next) => {
    
    const { cart } = req.body

    let line_items = [] 
    

    if (cart.length) {        
        try {
            line_items = cart.map(item => {
                console.log('item',item[0])
                return {
                    price_data: {
                        currency: 'usd',
                        unit_amount: item[0].price * 100,
                        product_data: {
                            name: item[0].name
                        },
                        
                    },
                    quantity: item[0].quantity
                }
            })
            

               
        } catch (error) {
            console.log(error)
        }

            
    }
    console.log(line_items)
    console.log(process.env.STRIPE_SECRET_KEY)
    // console.log(await stripe.checkout)
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: line_items,
        mode: 'payment',
        return_url: `${CLIENT_URL}/success?session_id=${process.env.STRIPE_SECRET_KEY}}`
    })

    console.log(session)
    res.send({ clientSecret: session.client_secret })
    // } catch (error) {
    //     next(error)
    // }
})

router.get('/session-status', async (req, res, next) => {
    try {
        const { session_id } = req.query
        console.log(session_id)
        const session = await stripe.checkout.sessions.retrieve(session_id)
        console.log(session)

        if (session) {
            res.send({
                status: session.status,
                customer_email: session.customer_details.email
            })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router