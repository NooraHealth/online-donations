Donor = require '../models/Donors'
express = require('express')
stripe = require('stripe')('sk_test_ASzEwo4Y9IlE0M8gBrLkwrP0')
router = express.Router()

saveDonor = (email, id) ->
  donor = new Donor {stripeID: id, email:email}
  donor.save (err)->
    if err
      console.log "There was an error saving the donor to mongoose:"
      console.log err

charge = (customer) ->
  return stripe.charges.create {
    amount: 1000
    currency: "usd"
    customer: customer.id
  }

# GET home page. 
router.post '/submit', (req, res) ->
  console.log 'recieved a payment to submit'
  stripeToken = req.body.stripeToken
  donationAmount = req.body.donationAmount
  email = req.body.email
  plan = if req.body.member then "membership" else null

  console.log stripeToken
  console.log donationAmount

  stripe.customers.create {
    card: stripeToken
    email: email
    plan: plan
  }
  .then (customer) ->
    console.log "made a customer!"
    console.log customer
    saveDonor(email, customer.id)
    
    charge customer
  .then (charge) ->
    console.log "Made a charge@"
    console.log charge
  .catch (error) ->
    console.log "There was an error!"
    console.log error.message

  res.redirect '/'

module.exports = router
