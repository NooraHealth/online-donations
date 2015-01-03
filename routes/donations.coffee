
express = require('express')
stripe = require('stripe')('pk_test__y4XPVW7eG98vkn2FgtsonNYt')
router = express.Router()

# GET home page. 
router.post '/submit', (req, res) ->
  console.log 'recieved a payment to submit'
  stripeToken = req.body.stripeToken
  donationAmount = req.body.donationAmount
  console.log stripeToken
  console.log donationAmount


module.exports = router
