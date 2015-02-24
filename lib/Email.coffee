
define = require '../lib/define'
Q = require 'q'
nodemailer = require 'nodemailer'
crypto = require 'crypto'

###
# My promise wrappers around the Mongoose library
###
class Email
  
  uniqueToken: ()->
    deferred = Q.defer()

    crypto.randomBytes 20, (err, buf) ->
      if err
        deferred.reject err
      else
        deferred.resolve buf.toString 'hex'

    return deferred.promise

  sendEmail: (mail) ->
    deferred = Q.defer()

    smtpTransport = nodemailer.createTransport 'smtp', {
      service: 'Gmail',
      auth:
        user: define.smtpUser
        pass: define.smtpPass
    }

    smtpTransport.sendMail mail, (err) ->
      if err
        deferred.reject err
      else
        deferred.resolve "email has been sent"

    return deferred.promise


module.exports = new Email
