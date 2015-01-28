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
  'models/Donor',
], function($, _, Backbone, DonationFormView, ThankYouPageView, 
            LoginPageView, DonorConsoleView, NavbarView, MessageView, Message, Nav, Donor){
    var Router = Backbone.Router.extend({ 

      initialize: function() {
        //Keep track of all the views currently open, so they can be 
        //closed upon moving to a new view
        this.currentViews = [];
      },

      routes: {
        "login": "login",
        "giving": "donationForm",
        "donorConsole" : "donorConsole",
        "thankyou" : "thankYouPage",
        "logout" : "donationForm"
      }, 
      
      thankYouPage: function() {
        //Clear the views
        this.closeViews();
        //After removal, reintroduce the main divs into the html for filling by the views
        this.resetContainerElements();

        console.log("Rendering the thankyouPageView");
        var page = new ThankYouPageView({router: this, model: Donor});
        var nav = new NavbarView({router: this});
        page.render();  
        nav.render();
        
        Nav.setPage('welcome');

        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      donationForm: function() {
        //Clear the views
        this.closeViews();
        //After removal, reintroduce the main divs into the html for filling by the views
        this.resetContainerElements();
        
        console.log("Rendering the donation form ");
        var page = new DonationFormView({router: this});
        var nav = new NavbarView({router: this});
        
        page.render();  
        nav.render();

        Nav.setPage('giving');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },
      
      donorConsole: function() {
        //Clear the views
        this.closeViews();
        //After removal, reintroduce the main divs into the html for filling by the views
        this.resetContainerElements();
       
        console.log("Closed all the views and now rendering the page");
        var page = new DonorConsoleView({router: this});
        var nav = new NavbarView({router: this});
        page.render();  
        nav.render();
        
        Nav.setPage('console');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      //Closes all the views currently in effect
      closeViews: function() {
        for(var i=0; i<this.currentViews.length; i++) {
          console.log(this.currentViews[i]);
          this.currentViews[i].close();
        }

        this.currentViews = [];
      },

      resetContainerElements: function() {
        $('.container').html("<div id='nav'></div><div id='body'></div><div id='modal'></div>");
      }

    });

    Backbone.history.start();
  
    return new Router();
  });
