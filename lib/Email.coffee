
Q = require 'q'
nodemailer = require 'nodemailer'

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
    smtpTransport = nodemailer.createTransport 'smtp', {
      service: 'SendGrid',
      auth:
        user: 
    }


module.exports = new MyMongoose
