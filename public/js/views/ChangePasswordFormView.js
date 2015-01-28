
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/changePasswordModal',
  'views/MessageView',
  'models/Message',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, changePasswordFormTemplate, MessageView, Message){

    var ChangePasswordFormView = Backbone.View.extend({
    
      el: "#modal",
      
      initialize: function(options) {
      },

      successMessage: function() {
        return $("#change-password-success");
      },

      submitChangePassword: function() {
        return $("#submit-change-password");
      },  

      changePasswordForm: function() {
        return $("#change-password-form");
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

      verifyChangePasswordInputs: function(e) {
        e.preventDefault();
        console.log("Verifying the changepassword input fields");

        if (this.$("input[name=currentpassword]").val() == "" ) {
          this.message.set({error: "Please enter your current password."});
          return false;
        }

        if (this.$("input[name=password]").val() == "" ) {
          this.message.set({error: "Please enter a new password."});
          return false;
        }
        
        if (this.$("input[name=password]").val() != this.$("input[name=confirm]").val()) {
          this.message.set({error: "Your passwords do not match"});
          return false;
        }
          
        data = {
          currentpassword: $("input[name=currentpassword]").val(),
          password: $("input[name=password]").val(),
        };
        
        this.$("#submit-change-password").prop('disabled', true);
        
        $.post('donors/changepassword', data, function() {
          console.log("posting successful");
        })
          .done(this.handleResponse.bind(this))
          .fail(this.handleError.bind(this))
      },
      
      handleError: function() {
        console.log("in the handle error");
        this.message.set({error: "There was an error completing your request. Please try again."});
        this.resetChangePasswordForm();   
      },

      handleResponse: function(response) {
        console.log("in the handle response");
        if ( response.error ) {
          this.message.set({error: response.error});
          this.resetChangePasswordForm();  
        } 
        this.showSuccessMessage();
      },

      showSuccessMessage: function() {
        this.changePasswordForm().hide();
        this.submitChangePassword().hide();
        this.successMessage().show(); 
      },

      resetChangePasswordForm: function(){
        $('#change-password-form')[0].reset();
        this.$("#submit-change-password").prop('disabled', false);
      },
      
      hide: function() {
        $('#change-password-modal').modal('hide');
      },

      show: function() {
        $('#change-password-modal').modal('show');
      },

      render: function() {
        var html = changePasswordFormTemplate();
        this.$el.html(html);      

        this.successMessage().hide();

        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#change-password-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return ChangePasswordFormView;
  });
