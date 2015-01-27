
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var Donation = Backbone.Model.extend({
      
    defaults: {
    },
    
    //Url for submitting donations to Stripe
    urlRoot: 'donations/submit',

    validate: function(values,  options) {
      console.log("Validating the input");
      if ( values.email == "") {
        return "Please enter a valid email address";
      }
      
      if ( values.amount == "" || !parseInt(values.amount) ) {
        return "Please enter a valid donation";
      }
      
      if ( values.name == "") {
        return "Please enter your full name";
      }

      if ( values.password.length < 6 ) {
        return "Password must be longer than 6 characters";
      }

      console.log("password", values.password);
      console.log("confirm", values.confirm);
      if (values.password != values.confirm) {
        return "Your passwords do not match";
      }
      
    }
   }); 
  
  return Donation;
});
