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
        
        //Initialize the Donor that will be use throughout the entire app
        this.donor = new Donor();
        this.navModel = new Nav();
        this.navModel.set({donor: this.donor});
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

        var page = new ThankYouPageView({router: this, model: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        page.render();  
        nav.render();
        
        this.navModel.setPage('welcome');

        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      donationForm: function() {
        //Clear the views
        this.closeViews();
        //After removal, reintroduce the main divs into the html for filling by the views
        this.resetContainerElements();
        
        var page = new DonationFormView({router: this, donor: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        
        page.render();  
        nav.render();

        this.navModel.setPage('giving');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },
      
      donorConsole: function() {
        //Clear the views
        this.closeViews();
        //After removal, reintroduce the main divs into the html for filling by the views
        this.resetContainerElements();
       
        var page = new DonorConsoleView({router: this, model: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        page.render();  
        nav.render();
        
        this.navModel.setPage('console');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      //Closes all the views currently in effect
      closeViews: function() {
        for(var i=0; i<this.currentViews.length; i++) {
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
