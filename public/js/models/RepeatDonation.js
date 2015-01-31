define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    /**
     * Model for the new donation
     */
    var RepeatDonation = Backbone.Model.extend ({
      
      urlRoot: function() {
        if(this.get('editMembership')) {
          return 'donations/planchange/'+ this.get('donorID');
        }

        if(this.get('onetime')) {
          return 'donations/onetime/' + this.get('donorID');
        }
      },

      validate: function(values, options) {
        if ( values.amount != 0 && !parseFloat(values.amount) ) {
          return "Please enter a valid donation amount";
        }
        
        if (values.planID == "" || typeof(values.planID) != "string") {
          //If this is a call to add a plan to a customer, then it is ok
          //if there is no planID
          if (!values.planID && !values.addPlan)
            return "PlanID not set";
        }

        if (values.subscriptionID == "" || typeof(values.subscriptionID) != "string") {
          return "Subscription ID not set";
        }

        if (values.donorID == "" || typeof(values.donorID) != "string") {
          return "Donor ID not correctly set";
        }

      },
    });

    return RepeatDonation;
});
