Donor = require '../models/Donors'
express = require('express')
stripe = require('stripe')('sk_test_ASzEwo4Y9IlE0M8gBrLkwrP0')
router = express.Router()

createCustomer = (token, email, planID) ->
  return stripe.customers.create {
    card: token
    email: email
    plan: planID
  }

createNewPlan = (planID, amount) ->
  return stripe.plans.create {
    amount: amount
    interval: "month"
    name: planID
    id: planID
  }

saveDonor = (email, id) ->
  donor = new Donor {stripeID: id, email:email}
  donor.save (err)->
    if err
      console.log "There was an error saving the donor to mongoose:"
      console.log err

charge = (customer, amount) ->
  console.log amount
  return stripe.charges.create {
    amount: amount
    currency: "usd"
    customer: customer.id
  }

chargeOnce = (params) ->
  return createCustomer params.stripeToken, "onetime"
  .then (customer) ->
    console.log "made a customer!"
    console.log customer
    saveDonor(params.email, customer.id)
    amount = if params.amount then parseFloat(params.amount) else 0
    charge customer, amount
  .then (charge) ->
    console.log "Made a charge@"
    console.log charge




subscribeToPlan = (params) ->
  return createNewPlan params.email, params.amount
  .then (plan)->
    console.log "Made a plan!"
    console.log plan
    createCustomer params.stripeToken, params.email, params.email
  .then (customer) ->
    console.log "made a customer!"
    console.log customer
    saveDonor(email, customer.id)
    amount = if params.amount then parseFloat(params.amount) else 0
    charge customer, amount
  .then (charge) ->
    console.log "Made a charge@"
    console.log charge

# GET home page. 
router.post '/submit', (req, res) ->
  console.log 'recieved a payment to submit'
  stripeToken = req.body.stripeToken
  donationAmount = req.body.donationAmount
  email = req.body.email

  console.log stripeToken
  console.log donationAmount
  
  if req.body.member
    promise = subscribeMember req.body
  else
    promise = chargeOnce req.body
  
  promise.catch (err) ->
    req.redirect

  res.redirect '/'

module.exports = router
