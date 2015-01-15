express = require('express')
router = express.Router()
passport = require 'passport'

router.post '/' , (req, res, next)->
  
  console.log "Recieved a request to authenticate"
  passport.authenticate('local', (err, user, info) ->
    if err
      res.send {error: err}
    if !user
      res.send {error: "We don't recognize those credentials. Have another go." }
    else
      res.send {donor: { email: user.email }}
    #req.logIn user, (err) ->
      #if err
        #next err

      #return res.redirect '/'
  )(req, res, next)


module.exports = router
