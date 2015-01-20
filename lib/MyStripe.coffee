stripe = require('stripe')( process.env.STRIPE_SECRET_KEY_TESTING )

###
# My wrappers around the Stripe api
###
class MyStripe
  
  retrieveDonorInfo: (id) ->
    console.log "retrieving infor of #{id}"
    return stripe.customers.retrieve id

  retrieveDonations: (donorId) ->
    return stripe.charges.list { customer: donorId }

  createDonor: (token, email, planID, metadata) ->
    console.log "creating customer"
    return stripe.customers.create {
      card: token
      email: email
      plan: planID
      metadata: metadata
    }

  removeDonor: (donorID) ->
    console.log "Removing customer"
    return stripe.customers.del donorID

  createNewPlan: (planID, amount) ->
    console.log "Creating a new plan"
    return stripe.plans.create {
      amount: amount
      interval: "month"
      currency: "usd"
      name: planID
      id: planID
      statement_descriptor: "Noora Health donation"
    }

  charge: (donor, amount) ->
    console.log "chargin customer"
    return stripe.charges.create {
      amount: amount
      currency: "usd"
      customer: donor.id
    }


module.exports = new MyStripe
