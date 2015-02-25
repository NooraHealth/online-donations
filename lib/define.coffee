
define = {
  host: 'localhost:3000'
  
  humanReadableCents: (amount) ->
    amount = amount.toString()
    first = amount.slice(0, amount.length-2)
    second = amount.slice amount.length-2
    return "$#{first}.#{second}"

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

  monthlyDonorConfirmation: (email, amount) ->
    dollars = this.humanReadableCents amount
    return {
      from: "tech@noorahealth.org"
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Thank you for giving to Noora Health!'
      amount: dollars
      }
  
  onetimeConfirmationEmail: (email, amount) ->
    dollars = this.humanReadableCents amount
    return {
      from: "tech@noorahealth.org"
      to: email
      from: 'tech@noorahealth.org'
      subject: 'Thank you for giving to Noora Health!'
      amount: dollars
      }
}
module.exports = define
