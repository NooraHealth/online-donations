express = require('express')
router = express.Router()
Donors = require '../models/Donors'

register = (req, res, next) ->
  if req.user
    next 'route'
    return

  donor = new Donors
    email: req.body.email
    name: req.body.name
    stripeId: ""

  Donors.register( donor, req.body.password, (err, account) ->
    if err
      console.log err
      res.json {error: err}
    else
      req.logIn account, (err) ->
        if err
          res.json {error: err}
        else
          next 'route'
    )
module.exports = register
