express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'
Donors = require '../models/Donors'
Q = require 'q'

saveCustomerID = (email, id) ->
  return Donors.findOne {email:email}


###
# Add a plan to an existing donor profile
# !! This route assumes that this donor is not already signed up for a monthly donation 
# plan
###
router.post '/planchange/:donorID', (req, res, err) ->
  console.log "recieved a PLAN CHANGE request"
  console.log req.body
  amount = req.body.amount
  donorID = req.params.donorID
  planID = req.body.planID
  subscriptionID = req.body.subscriptionID
  newPlanID = if amount == 0 then 'onetime' else donorID + new Date().getTime()
    
  #create a deferred promise to handle the planID = 'onetime' case, in which I 
  #do not need to create a new plan
  deferred = Q.defer()
  console.log deferred
  if newPlanID == 'onetime'
    console.log "The plan id was onetime"
    deferred.resolve()
  else
    console.log "PLanIS not ONETIME"
    # We need to create a new plan before moving onto updating the donor's subscription
    MyStripe.createNewPlan newPlanID, amount
    .then ()->
      deferred.resolve()
    .catch (err)->
      deferred.reject(err)
   
  #console.log deferred.isResolved()
  console.log deferred.promise
  deferred.promise.then () ->
    console.log "Got the deffered"
    MyStripe.updatePlan donorID, subscriptionID, newPlanID
  .then (newSubscription)->
    console.log 'this is the donors new subcscription'
    console.log "SUCCESS"
    res.send {success: "Donation plan updated successfully"}
  .catch (err) ->
    console.log "CAUGHT: a planchange error #{err.message}"
    res.send {error: err.message}

###
# Submit a one time donation from an existing donor
###
router.post '/onetime/:donorID', (req, res, err) ->
  console.log "recieved a ONETIME request"
  amount = req.body.amount
  donorID = req.params.donorID

  MyStripe.charge donorID, amount
  .then () ->
    res.send {success: "Successful donation!"}
  .catch (err) ->
    console.log "CAUGHT: a onetime error #{err.message}"
    res.send {error: err.message}

  
###
# Submit a donation from a new donor, sign them up with stripe,
# and then store their stripeID in the mongoDB
###
router.post '/submit', (req, res, err) ->
  console.log "Recieved a SUBMIT request"
  token = req.body.stripeToken
  amount = req.body.amount
  email = req.body.email
  monthly =  req.body.monthly
  name =  req.body.name
  newsletter = req.body.newsletter

  #Sign the customer up for a monthly plan with the plan
  #name as their email

  #preserve the context for later use in promise callbacks
  that = this

  if monthly == 'true'
    promise = MyStripe.createNewPlan email, amount
    
    promise.then (plan) ->
      MyStripe.createDonor token, email, email, {name: name}
    .then (stripeDonor)->
      #save the donor's stripe customer id to mongo
      Donors.findOne {email: email},(err, donor) ->
        donor.stripeId = stripeDonor.id
        donor.newsletter = (newsletter == 'true')
        donor.save()

      #Get the number of donors so far
      Donors.count {}, (err, count)->
        stripeDonor.count = count+25 #add 25 to account for previous donations made by other means
        #json the donor info back to the client
        res.json {error: null, donor: stripeDonor}

    promise.catch (err) ->
      res.json {error: err.message}

  #Charge the customer only once
  else
    promise = MyStripe.createDonor token, email, "onetime", {name: name}
    
    promise.then (stripeDonor)->
      #save the stripe customer Id to mongo
      Donors.findOne {email: email},(err, donor) ->
        donor.stripeId = stripeDonor.id
        donor.newsletter = (newsletter == 'true')
        donor.save()

      #Get the number of donors so far
      Donors.count {}, (err, count)->
        stripeDonor.count = count+25 #add 25 to account for previous donations made by other means
        #json the donor info back to the client
        res.json {error: null, donor: stripeDonor}

      #Charge the customer for their onetime donation
      MyStripe.charge stripeDonor.id, amount
      
    promise.catch (err) ->
      res.json {error: err.message}
  

module.exports = router
