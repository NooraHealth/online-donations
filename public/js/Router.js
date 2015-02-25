define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'views/DonationPage/DonationFormView',
  'views/ThankYouPageView',
  'views/LoginPageView',
  'views/DonorConsole/DonorConsoleView',
  'views/ForgotPasswordView',
  'views/ResetPasswordForm',
  'views/NavbarView',
  'views/MessageView',
  'models/Message',
  'models/Nav',
  'models/Donor',
], function($, _, Backbone, DonationFormView, ThankYouPageView, 
            LoginPageView, DonorConsoleView, ForgotPasswordView, ResetPasswordForm, NavbarView, MessageView, Message, Nav, Donor){
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
        "": "donationForm",
        "nooradonors" : "donorConsole",
        "thankyou" : "thankYouPage",
        "logout" : "donationForm",
        "forgotpassword" : "forgotPassword",
        "forgot/:token" : "resetPasswordForm"
      }, 
     
      /* 
       * Navigate to the reset password form page
       */
      resetPasswordForm: function(token) {
        
        //Clear the views
        this.closeViews();

        var page = new ResetPasswordForm({router: this, token: token});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});

        page.render();  
        nav.render();
        
        this.navModel.setPage('loginpage');

        this.currentViews.push(page);
        this.currentViews.push(nav);
      },
      /* 
       * Navigate to the login page
       */
      login: function() {
        
        //Clear the views
        this.closeViews();

        var page = new LoginPageView({router: this, donor: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});

        page.render();  
        nav.render();
        
        this.navModel.setPage('loginpage');

        this.currentViews.push(page);
        this.currentViews.push(nav);
      },
      
      /* 
       * Navigate to the donor's thank you page
       */
      thankYouPage: function() {
        
        //The user should not be able to access this if not logged in
        if (!this.donor.isLoggedIn()) {
          this.navigate('giving', {trigger: true});
          return;
        }
        
        //Clear the views
        this.closeViews();

        var page = new ThankYouPageView({router: this, model: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        page.render();  
        nav.render();
        
        this.navModel.setPage('welcome');

        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      /* 
       * Navigate to the main Donation Form page
       */
      donationForm: function() {
        
        //Clear the views
        this.closeViews();
        
        var page = new DonationFormView({router: this, donor: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        
        page.render();  
        nav.render();

        this.navModel.setPage('giving');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },
      
      /* 
       * Navigate to the Donor Console page
       */
      donorConsole: function() {

        //The user should not be able to access this if not logged in
        if (!this.donor.isLoggedIn()) {
          this.navigate('giving', {trigger: true});
          return;
        }

        //Clear the views
        this.closeViews();
       
        var page = new DonorConsoleView({router: this, model: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        page.render();  
        nav.render();
        
        this.navModel.setPage('console');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },      
      
      
      /* 
       * Navigate to the Forgot Password page
       */
      forgotPassword: function() {
        //Clear the views
        this.closeViews();
       
        var page = new ForgotPasswordView({router: this, model: this.donor});
        var nav = new NavbarView({router: this, donor: this.donor, model: this.navModel});
        page.render();  
        nav.render();
        
        this.navModel.setPage('forgotpassword');
        
        this.currentViews.push(page);
        this.currentViews.push(nav);
      },

      /* 
       * Close all of the open pages, to avoid zombie pages and overlapping event binding
       */
      closeViews: function() {
        for(var i=0; i<this.currentViews.length; i++) {
          this.currentViews[i].close();
        }

        this.currentViews = [];
        this.resetContainerElements();
      },

      /* 
       * After closing all the views and removing them from the page, readmit the 
       * primary container elements, which can then be filled with views. 
       */
      resetContainerElements: function() {
        $('.container').html("<div id='nav'></div><div id='body'></div><div id='modal'></div>");
      }

    });

    Backbone.history.start();
    
    return Router;
  });
