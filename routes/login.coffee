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
      #res.redirect '/donors/info/' + user.stripeId

      promise = MyStripe.retrieveDonorInfo user.stripeId

      promise.then (donor)->
        #donorinfo.donations = [{amount:100, date: "March 30, 2015"}, {amount:250, date: "June 30, 2015"}]
        console.log "returve donor"
        console.log donor
        #MyStripe.retrieveDonations
        res.send {donor: donor}
      
      promise.catch (err) ->
        console.log err
        res.send {error: err}
  )(req, res, next)


module.exports = router
