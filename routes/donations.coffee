express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'
Donors = require '../models/Donors'

saveCustomerID = (email, id) ->
  Donors.findOne {email:email}, (err, donor)->
    donor.stripeId = id
    donor.save()

# POST a donation to submit to Stripe 
router.post '/submit', (req, res, err) ->
  token = req.body.stripeToken
  amount = req.body.amount
  email = req.body.email
  monthly =  req.body.monthly

  #Sign the customer up for a monthly plan with the plan
  #name as their email
  if monthly == 'true'
    promise = MyStripe.createNewPlan email, amount
    
    promise.then (plan) ->
      MyStripe.createCustomer token, email, email
    
    promise.then (customer)->
      Donors.saveCustomerID email, customer.id
      #send the donor info back to the client
      res.send {error: null, donor: customer}
    
    promise.catch (err) ->
      res.send {error: err.message}

  #Charge the customer only once and sign them up for the 
  # 'onetime' plan
  else
    promise = MyStripe.createCustomer token, email, "onetime"
    
    promise.then (customer)->
      Donors.saveCustomerID email, customer.id
      #send the donor info back to the client
      res.send {error: null, donor: customer}
    promise.catch (err) ->
      res.send {error: err.message}
  

module.exports = router
