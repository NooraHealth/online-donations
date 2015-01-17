stripe = require('stripe')( process.env.STRIPE_SECRET_KEY_TESTING )

###
# My wrappers around the Stripe api
###
class MyStripe
  
  retrieveDonorInfo: (id) ->
    return stripe.customers.retrieve id

  createCustomer: (token, email, planID) ->
    return stripe.customers.create {
      card: token
      email: email
      plan: planID
    }

  removeCustomer: (customerID) ->
    return stripe.customers.del customerID

  createNewPlan: (planID, amount) ->
    return stripe.plans.create {
      amount: amount
      interval: "month"
      currency: "usd"
      name: planID
      id: planID
      statement_descriptor: "Noora Health donation"
    }

  charge: (customer, amount) ->
    return stripe.charges.create {
      amount: amount
      currency: "usd"
      customer: customer.id
    }

  chargeOnce: (token, amount, email) ->
    #preserve the MyStripe context for use later in the callback
    that = this

    return this.createCustomer token, email, "onetime"
    .then (customer) ->
      #save the stripe customer id to the donor profile
      that.saveCustomerID email, customer.id
      
      #charge the customer
      that.charge customer, amount

  subscribeMonthly: (token, amount, email) ->
    #preserve the MyStripe context for use in the callback
    that = this

    return this.createNewPlan email, amount
    .then (plan)->
      #Create a new customer with the email as the plan name
      that.createCustomer token, email, email
    .then (customer) ->
      #save the customerID to the donor's profile
      that.saveCustomerID email, customer.id

module.exports = new MyStripe
