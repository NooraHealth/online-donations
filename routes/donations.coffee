express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'
MyMongoose = require '../lib/MyMongoose'
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
    deferred.resolve()
  else
    # We need to create a new plan before moving onto updating the donor's subscription
    MyStripe.createNewPlan newPlanID, amount
    .then ()->
      deferred.resolve()
    .catch (err)->
      deferred.reject(err)
   
  #console.log deferred.isResolved()
  deferred.promise.then () ->
    MyStripe.updatePlan donorID, subscriptionID, newPlanID
  .then (newSubscription)->
    res.send {subscription: newSubscription}
  .catch (err) ->
    res.send {error: err.message}

###
# Submit a one time donation from an existing donor
###
router.post '/onetime/:donorID', (req, res, err) ->
  amount = req.body.amount
  donorID = req.params.donorID

  MyStripe.charge donorID, amount
  .then (donation) ->
    res.send {donation:donation}
  .catch (err) ->
    res.send {error: err.message}

  
###
# Submit a donation from a new donor, sign them up with stripe,
# and then store their stripeID in the mongoDB
###
router.post '/submit', (req, res, err) ->
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

  if monthly == true
    planID = email + new Date().getTime()
    
    MyStripe.createNewPlan planID, amount
    .then (plan) ->
      return MyStripe.createDonor token, email, email, {name: name}
      .then (stripeDonor)->
        console.log "geot thje donor back"
        #save the donor's stripe customer id to mongo
        return MyMongoose.findOne Donors, {email: email}
        .then (donor) ->
          donor.stripeId = stripeDonor.id
          donor.newsletter = (newsletter == true)
          donor.save()
          console.log "saved the donor"
          return MyMongoose.count Donors, {}
          .then (count)->
            donor.count = count+25 #add 25 to account for previous donations made by other means
            donor.save()
            #json the donor info back to the client
            #res.json {error: null, donor: stripeDonor}
            res.redirect '/donors/info/' + stripeDonor.id
          .catch (err) ->
            undoRegistration email, stripeDonor.id
            res.json {error: err.message}

  #Charge the customer only once
  else
    promise = MyStripe.createDonor token, email, "onetime", {name: name}
    
    promise.then (stripeDonor)->
      #Charge the customer for their onetime donation
        #save the stripe customer Id to mongo
      return MyMongoose.findOne Donors, {email: email}
      .then (donor) ->
        donor.stripeId = stripeDonor.id
        donor.newsletter = (newsletter == true)
        donor.save()
        #Get the number of donors so far
        return MyMongoose.count Donors, {}
        .then (count)->
          donor.count = count+25 #add 25 to account for previous donations made by other means
          donor.save()
          return MyStripe.charge stripeDonor.id, amount
        .then (charge) ->
            #json the donor info back to the client
            #res.json {error: null, donor: stripeDonor}
            res.redirect '/donors/info/' + stripeDonor.id
        .catch (err) ->
          undoRegistration email, stripeDonor.id
          res.json {error: err.message}



undoRegistration = (email, donorID, chargeID) ->
  #Delete the register user from the server
  #so they can sign up again
  MyMongoose.findOneAndRemove Donors, {email: email}

  #remove the customer from the stripe database, so they
  #can sign up again
  MyStripe.removeDonor donorID
  
module.exports = router
