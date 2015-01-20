express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'

# Render the donor console
router.get '/info/:stripeId', (req, res)->
  stripeId =  req.params.stripeId
  promise = MyStripe.retrieveDonorInfo stripeId

  promise.then (donorinfo)->
    console.log "retireved donor info"
    console.log donorinfo
    res.send {donor: donorinfo, error: err}
  
  promise.catch (err) ->
    console.log err
    res.send {error: err}
  

module.exports = router
