express = require('express')
stripe = require('stripe')('sk_test_ASzEwo4Y9IlE0M8gBrLkwrP0')
router = express.Router()

# GET home page. 
router.post '/submit', (req, res) ->
  console.log 'recieved a payment to submit'
  stripeToken = req.body.stripeToken
  donationAmount = req.body.donationAmount
  email = req.body.email

  console.log stripeToken
  console.log donationAmount
  stripe.charges.create {
    amount: 1000
    currency: "usd"
    card: stripeToken
    description: email
  }, (err, charge) ->
    if err
      console.log "There was an error"
      console.log err
    if err and err.type == "StripeCardError"
      console.log "The card was declined"
    else
      console.log "The charge was made!"
      console.log charge
  #res.redirect '/'


module.exports = router
