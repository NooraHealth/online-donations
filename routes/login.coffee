express = require('express')
router = express.Router()
passport = require 'passport'
MyStripe = require '../lib/MyStripe'

router.post '/' , (req, res, next)->
  
  console.log "Recieved a request to authenticate"
  passport.authenticate('local', (err, user, info) ->
    if err
      return res.send {error: err}
    if !user
      return res.send {error: "We don't recognize those credentials. Have another go." }
    else
      promise = MyStripe.retrieveDonorInfo user.stripeId
      promise.then (donorinfo, err)->
        console.log "retireved donor info"
        console.log donorinfo
        res.send {donor: donorinfo, error: err}
        #return res.redirect '/donors/info/' + user.stripeId
  )(req, res, next)


module.exports = router
