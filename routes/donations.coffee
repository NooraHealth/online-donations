express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'
Donors = require '../models/Donors'

saveCustomerID = (email, id) ->
  return Donors.findOne {email:email}

# POST a donation to submit to Stripe 
router.post '/submit', (req, res, err) ->
  token = req.body.stripeToken
  amount = req.body.amount
  email = req.body.email
  monthly =  req.body.monthly
  name =  req.body.name

  #Sign the customer up for a monthly plan with the plan
  #name as their email

  #preserve the context for later use in promise callbacks
  that = this

  if monthly == 'true'
    promise = MyStripe.createNewPlan email, amount
    
    promise.then (plan) ->
      donorData.plan = plan.id
      MyStripe.createDonor token, email, email, {name: name}
    
    promise.then (stripeDonor)->
      #save the donor's stripe customer id to mongo
      Donors.findOne {email: email},(err, donor) ->
        donor.stripeId = stripeDonor.id
        donor.save()

      #send the donor info back to the client
      res.send {error: null, donor: stripeDonor}
    
    promise.catch (err) ->
      res.send {error: err.message}

  #Charge the customer only once
  else
    promise = MyStripe.createDonor token, email, "onetime", {name: name}
    
    promise.then (stripeDonor)->
      #save the stripe customer Id to mongo
      Donors.findOne {email: email},(err, donor) ->
        donor.stripeId = stripeDonor.id
        donor.save()

      #Charge the customer for their onetime donation
      MyStripe.charge stripeDonor, amount
      
      #send the donor info back to the client
      res.send {error: null, donor: stripeDonor}
    
    promise.catch (err) ->
      res.send {error: err.message}
  

module.exports = router
