
lib = require '../lib/lib'
Q = require 'q'
crypto = require 'crypto'
fs = require "fs"
_ = require "underscore"

###
# My promise wrappers around the Mongoose library
###
class Email

  host: process.env.HOST

  constructor: ( @template, @mailer )->

  @setUniqueToken: (donor)->
    console.log "Setting unique token"
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

  send: ( mail ) ->
    console.log "Sedning an email"
    deferred = Q.defer()

    @mailer.send mail, (err) ->
      if err
        console.log "error sending email", err
        deferred.reject err
      else
        deferred.resolve "email has been sent"

    return deferred.promise

  resetEmail: (email, token) ->
    host = lib.host
    html = @getHtml(@template, { to: email })
    return {
      from: "founders@noorahealth.org"
      to: email
      subject: 'Password Reset'
      link: "http://#{host}/#forgot/#{token}"
      html: html
    }

  confirmResetPasswordEmail: ( email ) ->
    html = @getHtml(@template, { email: email })
    return {
      from: "founders@noorahealth.org"
      to: email
      subject: 'Your password has been changed'
      html: html
    }

  confirmationEmail: (email, amount) ->
    dollars = lib.humanReadableCents amount
    html = @getHtml(@template, {email: email, amount: amount })
    return {
      from: "founders@noorahealth.org"
      html: html
      to: email
      subject: 'Thank you for your contribution to Noora Health!'
      amount: dollars
    }


  getHtml: (templateName, data)->
    templatePath = "./views/emails/#{templateName}.html"
    templateContent = fs.readFileSync(templatePath, encoding="utf8")
    _.template templateContent, data

module.exports = Email
