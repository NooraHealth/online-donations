express = require('express')
router = express.Router()
passport = require 'passport'
MyStripe = require '../lib/MyStripe'
Q = require 'q'

router.get '/', (req, res, next) ->
  res.render 'index'

router.post '/' , (req, res, next)->
  
  passport.authenticate('local', (err, user, info) ->
    if err
      return res.send {error: err}
    if !user
      return res.send {error: "We don't recognize those credentials. Have another go." }
    else
      req.logIn user, (err) ->
        if err
          res.send {error: "There was an error logging in #{err}"}
        else
          res.redirect '/donors/info/' + user.stripeId

  )(req, res, next)


module.exports = router
