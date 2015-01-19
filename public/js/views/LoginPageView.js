define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'models/Message',
  'routers/Router',
  'text!templates/login.hbs',
  'models/Donor'
], function($, _, Backbone, Handlebars, Message, Router, loginTemplate, Donor ){
    
    var LoginPage = Backbone.View.extend({
      el: "#body",
      events: {
        "click .donation-form": "navigateToDonationForm",
        "submit #login-form": "submit"
      },
      
      /*
       * Validate login form input before submitting,
       * post error message to user if not valid
       */
      submit: function(e) {
        //e.preventDefault();
        console.log("This is where I validate input");  
        var password = this.$el.find("#password");
        var email = this.$el.find("#email");

        if ( password.val() == "" ) {
          Message.set({error: "Please enter your password"});
          //prevent the form from submitting
          return false;
        }

        if ( email.val() == "" ) {
          Message.set({error: "Please enter your email address"});
          //prevent the form from submitting
          return false;
        }

        credentials = {
          email: this.$el.find("#email").val(),
          password: this.$el.find("#password").val(),
        };

        $.post('/login', credentials, function() {
          console.log("post successful"); 
        }).done(function(response) {
          if (response.error)
            Message.set({error: response.error});
          else if (response.donor) {
            Donor.set( response.donor );
            Router.navigate("donors", {trigger: true});
          } else {
            Message.set({error: "There was an error logging in. Please try again."});
          }
        }).fail(function(err) {
          Message.set({error: err});
        });
        
        //Submit the form to authenticate the credentials
        return false;

      },

      navigateToDonationForm: function() {
        Router.navigate("donations", {trigger: true});
      },

      render: function() {
        var template = Handlebars.compile(loginTemplate);
        var html = template();
        this.$el.html(html);      
      }
    });
    return new LoginPage();
  });
