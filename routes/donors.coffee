express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyMongoose = require '../lib/MyMongoose'
MyStripe = require '../lib/MyStripe'
MyPassport = require '../lib/MyPassport'
Q = require 'q'


router.get '/' , (req, res) ->
   res.render 'index'

###
# Retrieve the donor information from stripe
###
router.get '/info/:stripeId', (req, res)->
  stripeId =  req.params.stripeId
  #their donation history
  donations = MyStripe.retrieveDonations stripeId
  donorInfo = MyStripe.retrieveDonorInfo stripeId
  donor = MyMongoose.findOne Donors, {stripeId: stripeId}

  #collect all requests into a single promise
  all = Q.all [donations, donorInfo, donor]

  #after all requests have returned, return the donorinfo 
  #and the donor's donations to the client
  all.spread (donations, donorinfo, donor)->
    console.log "Sending back to user"
    count = donor.count
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
      res.send {error: err}

###
# Change a donor's email
###
router.post '/changepassword', (req, res) ->
  console.log "in the change password"
  req.user.authenticate req.body.currentpassword, (err, donor, passwordErr) ->
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

###
# Change a donor's password
###
router.post '/changeemail', (req, res) ->
  console.log "in the change email "
  MyPassport.authenticateUser req.user req.body.password
    .then (donor) ->
      donor.email = req.body.newemail
      donor.save (err) ->
        if err
          res.send {error: err}
        else
          res.send {success: donor}
    .catch (err) ->
      res.send {error: err}

###
# Send donor a reset password token which they can use to reset their password
###
router.post "/forgotpassword", (req, res) ->
  console.log "the email: "
  console.log req.body.email
  console.log "in the reset password route!"

module.exports = router
