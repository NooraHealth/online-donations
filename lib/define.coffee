
define = {
  host: 'donate.noorahealth.org'

  smtpService: "SendGrid"
  smtpUser: 'lucyannerichards@gmail.com'
  smtpPass: process.env.NODEMAILER_PASS

  resetEmail: (email, token) ->
    return {
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Password Reset'
      text: "Hello, /n/n
        You are recieving this email because someone has requested a password reset
        for your membership account at Noora Health./n
        Please click on this link, or paste it into your browser, to complete the process./n/n
        http://#{this.host}/forgot/#{token} /n/n 
        If you did not request a change, then please ignore this email and your password will
        remain unchanged"
    }

  confirmationEmail: (email) ->
    return {
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Your Noora Health password has changed!'
      text: "Hello! /n/n Your Noora Health member password has changed./n
        Please log in to Noora Health with your new password. /n /n
        donate.noorahealth.org/#login /n "
    }

}

module.exports = define
