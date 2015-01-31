express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'
Q = require 'q'

###
# Retrieve the donor information from stripe
###
router.get '/info/:stripeId', (req, res)->
  stripeId =  req.params.stripeId

  promise = MyStripe.retrieveDonorInfo stripeId

  promise.then (donor)->
    #MyStripe.retrieveDonations
    res.send {donor: donor, error: err}
  
  promise.catch (err) ->
    console.log err
    res.send {error: err}

###
# Update a donors payment information on Stripe
###
router.post '/cancelmembership/:donorID', (res, req, next) ->
  console.log "Going to cancel a donation"
  console.log req.body
  donorID = req.params.donorID
  planID = req.body.planID
  subscriptionID = req.body.subscriptionID
  console.log "planID: #{planID}, donorID: #{donorID}, subscriptionID: #{subscriptionID}"

  MyStripe.deletePlan planID
  .then ()->
    MyStripe.cancelMonthlyDonations donorID, subscriptionID
  .then () ->
    res.send {success: "Payment info updated successfully"}
  .catch (err) ->
    res.send {error: err.message}
      
###
# Update a donors payment information on Stripe
###
router.post '/changeDonorCard/:donorID', (res, req, next) ->
  stripeToken = req.body.stripeToken
  donorID = req.params.donorID
  console.log "changing the donor card"
  console.log "Stripe token #{stripeToken}, donorID: #{donorID}"

  MyStripe.changeDonorCard donorID, stripeToken
    .then () ->
      res.send {success: "Payment info updated successfully"}
    .catch (err) ->
      res.send {error: err.message}

###
# Change a donor's password
###
router.post '/changepassword', (req, res) ->
  req.user.setPassword req.body.password, (err, donor, passwordErr) ->
    if err
      res.send {error: passwordErr}
    else
      donor.save (error)->
        if error
          res.send {error: error}
        else
          res.send {error: null}

module.exports = router
