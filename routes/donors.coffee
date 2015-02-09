express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyMongoose = require '../lib/MyMongoose'
MyStripe = require '../lib/MyStripe'
Q = require 'q'


router.get '/' , (req, res) ->
   res.render 'index'

###
# Retrieve the donor information from stripe
###
router.get '/info/:stripeId', (req, res)->
  console.log "dONOR INFO"
  stripeId =  req.params.stripeId
  #their donation history
  donations = MyStripe.retrieveDonations stripeId
  donorInfo = MyStripe.retrieveDonorInfo stripeId
  count = MyMongoose.count Donors, {}

  #collect all requests into a single promise
  all = Q.all [donations, donorInfo, count]

  #after all requests have returned, return the donorinfo 
  #and the donor's donations to the client
  all.spread (donations, donorinfo, count)->
    console.log "Sending back to user"
    console.log "count: #{count}"
    res.send {donor: donorinfo, donations: donations, count: count}

  all.catch (err) ->
    res.send {error: err}

      
###
# Update a donors payment information on Stripe
###
router.post '/changeDonorCard/:donorID', (req, res, next) ->
  stripeToken = req.body.stripeToken
  donorID = req.params.donorID

  MyStripe.changeDonorCard donorID, stripeToken
    .then (donor) ->
      res.send {donor: donor}
    .catch (err) ->
      console.log err
      res.send {error: err.message}

###
# Change a donor's password
###
router.post '/changepassword', (req, res) ->
  req.user.authenticate req.body.currentpassword, (err, donor, passwordErr) ->
    console.log err
    console.log passwordErr
    if err
      res.send {error: err}
    if passwordErr
      res.send {error: passwordErr}
    #set a new password
    else
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
