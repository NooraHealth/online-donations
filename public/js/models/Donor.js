
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'templates/helpers/donatesMonthly'
], function($, _, Backbone, donatesMonthly){
    var Donor = Backbone.Model.extend({
      defaults: {
        email: null
    },

    getSubscriptionID: function() {
     return this.get('subscriptions').data[0].id;
    },

    getPlanID: function() {
      if ( this.get("subscriptions" ).total_count ==  0) {
        return null;
      }
      else {
        return this.get('subscriptions').data[0].plan.id;
      }
    }
   }); 
  
  return Donor;
});
