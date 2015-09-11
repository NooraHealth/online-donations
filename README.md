# Noora Donations #

Noora Health's Online Donor Portal. 

### Built Using... ###

* Stripe, Nodejs, Express, Handlebars, Backbone, and backed by MongoDB.

To build and run:
1) pull repo
2) run npm install
3) write dev.json or production.json with all environment variables
  -MONGO_URL
  -MAILER_PASS
  -HOST
  -STRIPE_SECRET_KEY
  -STRIPE_PUBLIC_KEY
  -PORT
4) for dev: $grunt dev
5) for production: $grunt production

