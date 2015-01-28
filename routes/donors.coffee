express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'
Q = require 'q'

# Render the donor console
router.get '/info/:stripeId', (req, res)->
  stripeId =  req.params.stripeId

  promise = MyStripe.retrieveDonorInfo stripeId

  promise.then (donor)->
    #donorinfo.donations = [{amount:100, date: "March 30, 2015"}, {amount:250, date: "June 30, 2015"}]
    
    console.log "returve donor"
    console.log donor
    #MyStripe.retrieveDonations
    res.send {donor: donor, error: err}
  
  promise.catch (err) ->
    console.log err
    res.send {error: err}

router.post '/changepassword', (req, res) ->
  console.log "in the change password"
  console.log req.body.password
  console.log req.user
  console.log req.user.setPassword
  req.user.setPassword req.body.password, (err, donor, passwordErr) ->
    if err
      console.log "There was an error setting the password #{passwordErr}"
      res.send {error: passwordErr}
    else
      console.log "set the password: it is now "
      console.log donor
      res.send {error: null}

module.exports = router
