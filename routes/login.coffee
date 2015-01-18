express = require('express')
router = express.Router()
passport = require 'passport'

router.post '/' , (req, res, next)->
  
  console.log "Recieved a request to authenticate"
  passport.authenticate('local', (err, user, info) ->
    if err
      return res.send {error: err}
    if !user
      return res.send {error: "We don't recognize those credentials. Have another go." }
    else
      console.log "redirecting"
      console.log user
      return res.redirect '/donors/info/' + user.stripeId
  )(req, res, next)


module.exports = router
