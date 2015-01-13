express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'


# GET home page. 
router.post '/submit', (req, res, err) ->
  console.log 'recieved a payment to submit'
  console.log req.body
  token = req.body.stripeToken
  amount = req.body.amount
  email = req.body.email
  monthly =  req.body.monthly

  if monthly == 'true'
    promise = MyStripe.subscribeMonthly token, amount, email
  else
    console.log "no monthly"
    promise = MyStripe.chargeOnce token, amount, email
  
  promise.catch (err) ->
    console.log "There was an error: "
    console.log err
    req.flash 'error', err.message
    res.redirect '/'


module.exports = router
