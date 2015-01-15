express = require('express')
router = express.Router()
Donors = require '../models/Donors'

register = (req, res, next) ->
  donor = new Donors
    email: req.body.email
    name: req.body.name
    stripeId: ""

  Donors.register( donor, req.body.password, (err, account) ->
    if err
      console.log err
      res.json {error: err.message}
    else
      req.logIn account, (err) ->
        if err
          console.log "Error registering donor"
          res.json {error: err.message}
        else
          next 'route'
    )
module.exports = register
