define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'views/DonationFormView',
  'views/ThankYouPageView',
  'views/LoginPageView',
  'views/DonorConsoleView'
], function($, _, Backbone, DonationFormView, ThankYouPageView, 
            LoginPageView, DonorConsoleView){
    var Router = Backbone.Router.extend({

      routes: {
        "login": "login",
        "donationForm": "donationForm",
        "donors" : "donorConsole",
        "thankyou" : "thankYouPage",
        "logout" : "logout"
      }, 

      logout: function() {
        DonationFormView.render();
      },

      thankYouPage: function() {
        console.log("Rendering the thankyouPageView");
        ThankYouPageView.render();  
      },

      donationForm: function() {
        console.log("Rendering the donationFormView");
        DonationFormView.render();  
      },
    
      login: function() {
        LoginPageView.render();
      },

      donorConsole: function() {
        console.log("inthe donor console functino in router");
        DonorConsoleView.render();
      }
    });

    Backbone.history.start();
    return new Router();
  });
