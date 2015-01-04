mongoose = require 'mongoose'
Schema = mongoose.Schema

donorSchema =
  stripeId: String

DonorSchema = new Schema donorSchema

module.exports = mongoose.model 'noora_donors' , DonorSchema
