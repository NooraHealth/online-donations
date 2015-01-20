express = require('express')
router = express.Router()
passport = require 'passport'
MyStripe = require '../lib/MyStripe'
Q = require 'q'

router.post '/' , (req, res, next)->
  
  console.log "Recieved a request to authenticate"
  passport.authenticate('local', (err, user, info) ->
    if err
      return res.send {error: err}
    if !user
      return res.send {error: "We don't recognize those credentials. Have another go." }
    else
      #res.redirect '/donors/info/' + user.stripeId

      #send out all requests to Stripe for needed donor info and
      #their donation history
      donations = MyStripe.retrieveDonations user.stripeId
      donorInfo = MyStripe.retrieveDonorInfo user.stripeId
      Q.all([donations, donorInfo]).spread (donations, donorinfo)->
        res.send {donor: donorinfo, donations: donations}
      #promises = Q.all [ MyStripe.retrieveDonorInfo user.stripeId, MyStripe.retrieveDonations user.stripeId ]

      #console.log promises
      ##handle all responses from stripe
      #promises.spread (donor, charges)->
        ##donorinfo.donations = [{amount:100, date: "March 30, 2015"}, {amount:250, date: "June 30, 2015"}]
        #console.log donor
        #console.log "cHARGES!"
        #console.log charges
        ##MyStripe.retrieveDonations
        #res.send {donor: donor}
      
      #promises.catch (err) ->
        #console.log err
        #res.send {error: err}
  )(req, res, next)


module.exports = router
