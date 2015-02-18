
/**
 * LoginPageBase: A login page template, including DOM event handlers. To extend this base, 
 * views will need to have the requisite IDs
 */

define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'models/Message',
  'views/MessageView',
  'views/FormBase', 
  'bootstrap'
], function($, _, Backbone, Handlebars, Message, MessageView , FormBase){
    
    var LoginBase = FormBase.extend({

      events: {
        "click #submit-login": "submitLogin",
        "click .forgot": "showForgotPasswordModal"
      },
      
      initialize: function(options) {
        this.router = options.router;
        this.donor = options.donor;
      },
      
      /*
       * Returns the donation form jquery object
       */
      form: function() {
        return this.$el.find("#login-form");
      },
      
      /*
       * Shows modal which allows users to request a new password token
       */
      showForgotPasswordModal: function () {
         this.router.navigate('forgotpassword', {trigger: true});
       },
      
      resetForm: function() {
        this.form()[0].reset();
        $("#submit-login").prop('disabled', false);
      },

      /*
       * Validate login form input before submitting,
       * post error message to user if not valid
       */
      submitLogin: function(e) {
        //e.preventDefault();
        var password = this.$el.find("#password");
        var email = this.$el.find("#email");

        if ( password.val() == "" ) {
          this.message.clear();
          this.message.set({error: "Please enter your password"});
          //prevent the form from submitting
          return false;
        }

        if ( email.val() == "" ) {
          this.message.clear();
          this.message.set({error: "Please enter your email address"});
          //prevent the form from submitting
          return false;
        }

        credentials = {
          email: this.$el.find("#email").val(),
          password: this.$el.find("#password").val(),
        };

        $.post('/login', credentials)
        .done(function(response) {
          if (response.error) {
            this.handleServerError(response.error);
            return;
          }

          if (response.donor) {
            this.donor.set( response.donor );
            this.donor.set({donations: response.donations.data});
            this.router.navigate("nooradonors", {trigger: true});
            return;
          } 
          
          this.handleServerError({error: {message: "There was an error logging in. Please try again"}});
        }.bind(this)).fail(this.handleServerError.bind(this));
        
        //Submit the form to authenticate the credentials
        return false;
      },

    });

    return LoginBase;
  });
