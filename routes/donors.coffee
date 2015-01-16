express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'

# Render the donor console
router.get '/console', (req, res)->
  console.log "rendering the donor console"
  #MyStripe.retrieveDonorInfo req.user.stripeID
  res.render 'donorConsole', donorInfo

module.exports = router
