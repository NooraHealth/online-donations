express = require('express')
router = express.Router()
Donors = require '../models/Donors'
MyStripe = require '../lib/MyStripe'

# Render the donor console
router.get '/info/:stripeId', (req, res)->
  console.log req.donorInfo
  donorInfo = req.donorInfo
  res.send {donor: donorInfo}

module.exports = router
