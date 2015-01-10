express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'


# GET home page. 
router.post '/submit', (req, res) ->
  console.log 'recieved a payment to submit'
  token = req.body.stripeToken
  amount = if req.body.amount then parseFloat req.body.amount else 0
  email = req.body.email
  monthly = req.body.monthly

  if monthly
    promise = MyStripe.subscribeMonthly token, amount, email
  else
    promise = MyStripe.chargeOnce token, amount, email
  
  promise.catch (err) ->
    console.log "There was an error: "
    console.log err
    req.flash 'error', err.message
    res.redirect '/'


module.exports = router
