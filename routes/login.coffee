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
      return res.send {error: {message: "We don't recognize those credentials. Have another go."}}
    else
      req.logIn user, (err) ->
        if err
          res.send {error: err}
        else
          res.redirect '/donors/info/' + user.stripeId

  )(req, res, next)

###
# Send donor a reset password token which they can use to reset their password
###
router.post "/forgotpassword", (req, res) ->
  console.log "the email: "
  console.log req.body.email
  console.log "in the reset password route!"


module.exports = router
