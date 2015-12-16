express = require 'express'
router = express.Router()
Donors = require '../models/Donors'
Email = require '../lib/Email'
MyStripe = require '../lib/MyStripe'
MyMongoose = require '../lib/MyMongoose'
MyPassport = require '../lib/MyPassport'
Q = require 'q'

# GET home page.
router.get '/', (req, res) ->
  res.render 'index', { title: 'NooraHealth' , stripe_key: process.env.STRIPE_PUBLIC_KEY }

###
# Send donor a reset password token which they can use to reset their password
###
router.post "/forgot", (req, res) ->
  donorEmail = req.body.email
  console.log "in the forgot route"
  
  MyMongoose.findOne Donors, { email: donorEmail }
    .then (donor) ->
      if !donor
        throw { message:"This email is not registered with us. Please register at donate.noorahealth.org" }
      else
        console.log "Trying to set unique token"
        return Email.setUniqueToken(donor)
    .then (token) ->
      console.log token
      console.log "1"
      emailer = new Email 'ResetPassword', req.app.locals.mailer
      console.log "2"
      email = emailer.resetEmail donorEmail, token
      console.log "3"
      emailer.send( email )
    .then (msg) ->
      res.send { success: "An email containing a link to reset your email has been sent."}
    .catch (err) ->
      console.log err
      res.send {error: err}

router.post '/reset/:token', (req, res) ->
  token = req.params.token
  password = req.body.password
  MyMongoose.findOne Donors, {resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }
    .then (donor) ->
      if !donor
        throw {message: "We're sorry, your token is invalid or has expired." }
      else
        donor.resetPasswordExpires = undefined
        donor.resetPasswordToken = undefined
        MyPassport.setPassword donor, password
          .then (donor) ->
            emailer = new Email 'ConfirmReset', req.app.locals.mailer
            email = emailer.confirmResetPasswordEmail donor.email
            emailer.send( email )
          .then () ->
            res.send {success: "Your password has been changed. Please log in using your new password."}
    .catch (err) ->
      console.log "ERROR" , err
      res.send {error: err}

module.exports = router
