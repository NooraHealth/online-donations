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
  
      #res.redirect '/donors/info/' + user.stripeId
      #send out all requests to Stripe for needed donor info and
      #their donation history
      donations = MyStripe.retrieveDonations user.stripeId
      donorInfo = MyStripe.retrieveDonorInfo user.stripeId

      #collect all requests into a single promise
      all = Q.all [donations, donorInfo]
      
      #after all requests have returned, return the donorinfo 
      #and the donor's donations to the client
      all.spread (donations, donorinfo)->
        res.send {donor: donorinfo, donations: donations}

      all.catch (err) ->
        res.send {error: err}

      req.logIn user, (err) ->
        if err
          console.log "There was an error logging in #{err}"

  )(req, res, next)


module.exports = router
