express = require 'express'
router = express.Router()
define = require '../lib/define'
Donors = require '../models/Donors'
Email = require '../lib/Email'
MyStripe = require '../lib/MyStripe'
MyMongoose = require '../lib/MyMongoose'
MyPassport = require '../lib/MyPassport'
Q = require 'q'

# GET home page.
router.get '/', (req, res) ->
  res.render 'index', { title: 'NooraHealth' }

###
# Send donor a reset password token which they can use to reset their password
###
router.post "/forgot", (req, res) ->
  email = req.body.email
  console.log "this is the email #{email}"
  
  MyMongoose.findOne Donors, {email: email}
    .then (donor) ->
      if !donor
        throw new Error "This email is not registered with us. Please register at donate.noorahealth.org"
      else
        return Email.setUniqueToken()
    .then (token) ->
      mail =  define.resetEmail(email, token)
      return Email.sendEmail mail, req.app.mailer
    .then (msg) ->
      res.send {success: "An email containing a link to reset your email has been sent."}
    .catch (err) ->
      console.log "ERROR: ", err
      res.send {error: "There was an error sending a reset email. Please try again."}

router.get '/forgot/:token', (req, res) ->
  token = req.params.token
  password = req.body.password
  MyMongoose.findOne Donors, {resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }
    .then (donor) ->
      console.log donor
      if !donor
        res.send {error: {message: "We're sorry, your token is invalid or has expired." }}
      else
        donor.resetPasswordExpires = undefined
        donor.resetPasswordToken = undefined
        MyPassport.setPassword donor, password
          .then (donor) ->
            Email.sendEmail define.confirmationEmail(donor.email)
          .then () ->
            res.send {success: "Your password has been changed. Please log in using your new password."}
    .catch (err) ->
      res.send {error: err}

module.exports = router
