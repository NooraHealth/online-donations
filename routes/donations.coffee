express = require('express')
router = express.Router()
MyStripe = require '../lib/MyStripe'


# POST a donation to submit to Stripe 
router.post '/submit', (req, res, err) ->
  token = req.body.stripeToken
  amount = req.body.amount
  email = req.body.email
  monthly =  req.body.monthly

  if monthly == 'true'
    promise = MyStripe.subscribeMonthly token, amount, email
  else
    promise = MyStripe.chargeOnce token, amount, email
  
  promise.catch (err) ->
    res.send {error: err.message}

  res.send {success: "Thank you for your donation!"}

module.exports = router
