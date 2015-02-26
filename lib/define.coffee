
define = {
  host: process.env.HOST
  
  humanReadableCents: (amount) ->
    amount = amount.toString()
    first = amount.slice(0, amount.length-2)
    second = amount.slice amount.length-2
    return "$#{first}.#{second}"

  resetEmail: (email, token) ->
    return {
      to: email
      subject: 'Password Reset'
      link: "http://#{host}/forgot/#{token}"
    }

  confirmationEmail: (email, amount) ->
    dollars = this.humanReadableCents amount
    return {
      to: email
      subject: 'Thank you for your contribution to Noora Health!'
      amount: dollars
      }

}
module.exports = define
