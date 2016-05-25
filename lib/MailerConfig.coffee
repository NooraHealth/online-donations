config = {
  from:'donations@noorahealth.org'
  host: 'smtp.gmail.com'
  secureConnection: true
  port: 465
  transportMethod: "SMTP"
  auth: {
    user: process.env.MAILER_USER
    pass: process.env.MAILER_PASS
  }
}

module.exports = config
