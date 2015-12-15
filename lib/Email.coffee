
define = require '../lib/define'
Q = require 'q'
crypto = require 'crypto'

###
# My promise wrappers around the Mongoose library
###
class Email
  
  setUniqueToken: (donor)->
    deferred = Q.defer()

    crypto.randomBytes 20, (err, buf) ->
      if err
        deferred.reject err
      else
        token =  buf.toString 'hex'
        donor.resetPasswordToken = token
        donor.resetPasswordExpires = Date.now() + 3600000
        donor.save (err)->
          if err
            deferred.reject err
          else
            deferred.resolve token

    return deferred.promise

  sendEmail: (template, mail, mailer) ->
    console.log "Sedning an email"
    deferred = Q.defer()

    mailer.send template, mail , (err) ->
      if err
        console.log "error sending email", err
        deferred.reject err
      else
        deferred.resolve "email has been sent"

    return deferred.promise


module.exports = new Email
