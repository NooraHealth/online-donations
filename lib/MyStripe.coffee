Donors = require '../models/Donors'
stripe = require('stripe')('sk_test_ASzEwo4Y9IlE0M8gBrLkwrP0')

class MyStripe

  createCustomer: (token, email, planID) ->
    return stripe.customers.create {
      card: token
      email: email
      plan: planID
    }

  removeCustomer: (customerID) ->
    return stripe.customers.del customerID

  createNewPlan: (planID, amount) ->
    console.log "Creating a new stripe plan #{planID} of #{amount}"
    stripe.plans.create {
      amount: amount
      interval: "month"
      currency: "usd"
      name: planID
      id: planID
      statement_descriptor: "Noora Health donation"
    }

  saveCustomerID: ( email, id) ->
    console.log "Updating the customer info of #{email}"
    Donors.findOneAndUpdate {email:email}, {stripeId:id}, (donor) ->
      console.log "Found a donor!"
      console.log donor

  charge: (customer, amount) ->
    console.log amount
    return stripe.charges.create {
      amount: amount
      currency: "usd"
      customer: customer.id
    }

  chargeOnce: (token, amount, email) ->
    that = this
    return this.createCustomer token, email, "onetime"
    .then (customer) ->
      console.log "made a customer!"
      console.log customer
      that.saveCustomerID email, customer.id
      that.charge customer, amount
    .then (charge) ->
      console.log "successfully charged the customer"
      that.saveCustomerID email, customer.id

  subscribeMonthly: (token, amount, email) ->
    console.log "Subscribing a monthly member"
    that = this
    return this.createNewPlan email, amount
    .then (plan)->
      console.log "Made new stripe plan"
      console.log plan
      that.createCustomer token, email, email
    .then (customer) ->
      console.log "Created a new stripe customer subscribed monthly"
      console.log customer
      that.saveCustomerID email, customer.id

module.exports = new MyStripe
