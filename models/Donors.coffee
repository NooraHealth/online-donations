mongoose = require 'mongoose'
Schema = mongoose.Schema
passportLocalMongoose = require 'passport-local-mongoose'

donorSchema =
  stripeId: String
  name:String
  newsletter: Boolean
  count: Number
  forgotPasswordToken: String
  forgotPasswordExpires: Date


DonorSchema = new Schema donorSchema

options =
  usernameField : 'email'
  incorrectUsernameError: '%s not found in our database, please consider offering a donation to become a member with Noora!'
  incorrectPasssword: 'You appear to already be registered with us, please log in to make a donation'

DonorSchema.plugin passportLocalMongoose, options

Donors =  mongoose.model 'noora_donors' , DonorSchema

####
## Before saving, check that the email does not already exist in the database
#donorSchema.pre 'save', (next) ->
  #self = @
  #Donors.count {email: self.email}

module.exports = Donors
