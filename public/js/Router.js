define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'views/DonationFormView',
  'views/ThankYouPageView',
  'views/LoginPageView',
  'views/DonorConsoleView',
  'views/NavbarView'
], function($, _, Backbone, DonationFormView, ThankYouPageView, 
            LoginPageView, DonorConsoleView, NavbarView){
    var Router = Backbone.Router.extend({

      routes: {
        "login": "login",
        "giving": "donationForm",
        "donorConsole" : "donorConsole",
        "thankyou" : "thankYouPage",
        "logout" : "donationForm"
      }, 

      logout: function() {
        DonationFormView.render();
      },

      thankYouPage: function() {
        var page = new ThankYouPageView({router: this});
        var nav = new NavbarView({router: this});
        page.render();  
        nav.render();
      },

      donationForm: function() {
        console.log("Rendering the donation form ");
        var login = new LoginPageView({router: this});
        var page = new DonationFormView({router: this});
        var nav = new NavbarView({router: this, loginModal: login});
        page.render();  
        nav.render();
        login.render();
      },
    
      //login: function() {
        //console.log("Creating a new loginpageview");
        //var login = new LoginPageView({router: this});
        //login.render(); 
      //},

      donorConsole: function() {
        var page = new DonorConsoleView({router: this});
        var nav = new NavbarView({router: this});
        page.render();  
        nav.render();
      }
    });

    Backbone.history.start();
  
    return new Router();
  });
