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
      res.send {donor: { email: user.email }}
      console.log("redirecting")
      #res.redirect '/donors/console'
      return
    #req.logIn user, (err) ->
      #if err
        #next err

      #return res.redirect '/'
  )(req, res, next)


module.exports = router
