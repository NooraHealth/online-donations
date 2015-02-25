
define = {
  host: 'localhost:3000'

  smtpService: "SendGrid"
  smtpUser: 'lucyannerichards@gmail.com'
  smtpPass: process.env.NODEMAILER_PASS

  resetEmail: (email, token) ->
    return {
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Password Reset'
      body: "Hello, /n/n
        You are recieving this email because someone has requested a password reset
        for your membership account at Noora Health./n
        Please click on this link, or paste it into your browser, to complete the process./n/n
        http://#{this.host}/#forgot/#{token} /n/n 
        If you did not request a change, then please ignore this email and your password will
        remain unchanged"
    }

  onetimeConfirmationEmail: (email, amount) ->
    amount = amount.toString()
    console.log amount
    first = amount.slice(0, amount.length-2)
    console.log first
    second = amount.slice amount.length-2
    console.log second
    dollars = "$#{first}.#{second}"
    console.log dollars
    console.log "DOLLARDS #{dollars}"
    return {
      from: "tech@noorahealth.org"
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Thank you for giving to Noora Health!'
      amount: dollars
      }

}
module.exports = define
