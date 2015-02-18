

/**
 * FormBase: basic functionality all forms on this site should share
 */

define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, Message, MessageView ){
    
    var FormBase = Backbone.View.extend({
      
      handleServerError: function(error ){
        this.message.clear();
        if (error.message) {
          this.message.set({error: error.message});
        } else {
          this.message.set({error: "There was an error connecting to the server. Please try again."});
        }
        this.resetForm(); 
      }, 

      handleValidationError: function(error) {
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.disableSubmitButton(false);
      },
      
      successMessage: function() {
        return $("#success-message");
      },
      
      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },


    });

    return FormBase;
});


