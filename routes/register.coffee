express = require('express')
router = express.Router()
Donors = require '../models/Donors'

register = (req, res, next) ->
  donor = new Donors
    email: req.body.email
    name: req.body.name
  console.log "Registering a new donor"

  Donors.register( donor, req.body.password, (err, account) ->
    if err
      console.log err
      res.render 'index',  {error: err.message}
    else
      req.logIn account, (err) ->
        if err
          console.log "Error registering donor"
          console.log err
        else
          #res.redirect '/donations/submit', {donorID: account._id}
          console.log "Successfully registered donor"
        next 'route'
    )
module.exports = register
