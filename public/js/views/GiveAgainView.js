
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/giveAgainModal',
  'views/MessageView',
  'models/Message',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, giveAgainFormTemplate, MessageView, Message){

    var GiveAgainFormView = Backbone.View.extend({
    
      el: "#modal",
      
      giveAgainSubmitButton: function() {
        return $("#submit-give-again");
      },
      
      modal: function() {
        return $("#give-again-modal");
      },
      
      giveAgainForm: function() {
        return $("#give-again-form");
      },

      successMessage: function() {
        return $("#success-message");
      },

      displayError: function(error) {
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.$('#submit-donation').prop('disabled',false);
      },

      events: {
        "click #submit-change-password": "verifyChangePasswordInputs",
      },

      showSuccessMessage: function() {
        this.giveAgainForm().hide();
        this.giveAgainSubmitButton().hide();
        this.successMessage().show(); 
      },

      resetChangePasswordForm: function(){
        $('#change-password-form')[0].reset();
        this.$("#submit-change-password").prop('disabled', false);
      },
      
      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },

      render: function() {
        var html = giveAgainFormTemplate({successMessage: "Your password has been changed successfully!"});
        this.$el.html(html);      

        this.successMessage().hide();

        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#give-again-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return GiveAgainFormView;
  });
