express = require('express')
router = express.Router()
Donors = require '../models/Donors'

# Render the donor console
router.get '/console', (req, res)->
  console.log "rendering the donor console"
  res.render 'donorConsole'

module.exports = router
