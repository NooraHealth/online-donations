stripe = require('stripe')( process.env.STRIPE_SECRET_KEY_TESTING )

###
# My wrappers around the Stripe api
###
class MyStripe
  
  retrieveDonorInfo: (id) ->
    console.log "retrieving infor of #{id}"
    return stripe.customers.retrieve id

  retrieveDonations: (donorId) ->
    console.log "retrieving donations"
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

  cancelMonthlyDonations: (planID) ->
    console.log "Deleting subscriptions #{planID}"
    return stripe.customers.cancelSubscription donorID, subscriptionID

  deletePlan: (planID) ->
    console.log "Deleting plan #{planID}"
    return stripe.plans.del planID

  updatePlan: (donorID, subscriptionID, planID) ->
    console.log "Updating the donor's plan subscription #{subscriptionID}"
    return stripe.customers.updateSubscription donorID, subscriptionID, {plan: planID}

  changeDonorCard: (donorID, stripeToken) ->
    console.log "changing the donor card information"
    return stripe.customers.update donorID, {card: stripeToken}

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

  charge: (donorID, amount) ->
    console.log "about to charge the customer #{amount}"
    console.log "chargin customer"
    return stripe.charges.create {
      amount: amount
      currency: "usd"
      customer: donorID
    }


module.exports = new MyStripe
