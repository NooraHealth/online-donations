define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'views/DonationFormView',
  'views/ThankYouPageView',
  'views/LoginPageView',
  'views/DonorConsoleView',
  'views/NavbarView',
  'views/MessageView',
  'models/Message',
  'models/Nav',
], function($, _, Backbone, DonationFormView, ThankYouPageView, 
            LoginPageView, DonorConsoleView, NavbarView, MessageView, Message, Nav){
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
        
        Nav.setPage('welcome');
      },

      donationForm: function() {
        console.log("Rendering the donation form ");
        var login = new LoginPageView({router: this});
        var page = new DonationFormView({router: this});
        var nav = new NavbarView({router: this, loginModal: login});
        
        page.render();  
        login.render();
        nav.render();

        Nav.setPage('giving');
      },
      
      donorConsole: function() {
        var page = new DonorConsoleView({router: this});
        var nav = new NavbarView({router: this});
        page.render();  
        nav.render();
        
        Nav.setPage('console');
      }
    });

    Backbone.history.start();
  
    return new Router();
  });
