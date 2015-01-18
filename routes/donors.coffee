express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'

# Render the donor console
router.get '/info/:stripeId', (req, res)->
  console.log "geting the donor info"
  stripeId =  req.params.stripeId
  promise = MyStripe.retrieveDonorInfo stripeId

  promise.then (donorInfo) ->
    console.log "retruee door info"
    console.log donorInfo
    return res.send {donor: donorInfo}
  
  promise.fail (err)->
    console.log "in the .fail"
    res.send {error: err, donor: null}
  

module.exports = router
