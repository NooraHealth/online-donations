config = {
  from:'tech@noorahealth.org'
  host: 'smtp.gmail.com'
  secureConnection: true
  port: 465
  auth: {
    user: 'lucy@noorahealth.org'
    pass: process.env.MAILER_PASS
  }
}

module.exports = config
