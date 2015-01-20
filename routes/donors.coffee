express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'

# Render the donor console
router.get '/info/:stripeId', (req, res)->
  stripeId =  req.params.stripeId
  promise = MyStripe.retrieveDonorInfo stripeId

  promise.then (donorInfo) ->
    res.send {error: null, donor: donorInfo}
  
  promise.catch (err)->
    console.log "in the .fail"
    res.send {error: err, donor: null}
  

module.exports = router
