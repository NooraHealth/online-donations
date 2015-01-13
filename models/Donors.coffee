mongoose = require 'mongoose'
Schema = mongoose.Schema
passportLocalMongoose = require 'passport-local-mongoose'

donorSchema =
  stripeId: String
  name:String

DonorSchema = new Schema donorSchema

options =
  usernameField : 'email'
  incorrectUsernameError: '%s not found in our database, please consider offering a donation to become a member with Noora!'
  incorrectPassswordError: 'The password you entered is not correct. Please try again'
  userExistsError: '%s is already registered with us, please log in to make a donation'

DonorSchema.plugin passportLocalMongoose, options

module.exports = mongoose.model 'noora_donors' , DonorSchema
