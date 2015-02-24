
define = require '../lib/define'
Q = require 'q'
nodemailer = require 'nodemailer'
crypto = require 'crypto'

###
# My promise wrappers around the Mongoose library
###
class Email
  
  uniqueToken: (donor)->
    deferred = Q.defer()

    crypto.randomBytes 20, (err, buf) ->
      if err
        deferred.reject err
      else
        token =  buf.toString 'hex'
        donor.resetPasswordToken = token
        donor.resetPasswordExpires = Date.now() + 3600000
        deferred.resolve token

    return deferred.promise

  sendEmail: (mail, mailer) ->
    deferred = Q.defer()

    mailer.send 'email', mail , (err) ->
      if err
        deferred.reject err
      else
        deferred.resolve "email has been sent"

    return deferred.promise


module.exports = new Email
