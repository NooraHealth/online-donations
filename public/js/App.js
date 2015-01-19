define([
  // These are path alias that we configured in our bootstrap
  'backbone',
  'routers/Router'
], function(Backbone, Router){
      var initialize = function() {
        console.log("initializing app");
        console.log(Router);
        Router.navigate('donationForm', {trigger: true}); 
        //console.log("initializing the app");
        ////DonorConsole
        //this.donor = new Donor;
        //this.donorConsoleView = new DonorConsole({model: this.donor});
        
        ////Create the donation form view
        //this.donationFormView = new DonationForm;

        ////Create the messages view
        //this.message = new Message;
        //this.messageView = new MessageView({model: this.message});
        
        ////Create the navbar view
        //this.navbar = new Navbar;
        //this.navbarView = new NavbarView({model: this.navbar});

        ////Login Page
        //this.thankYouPageView = new ThankYouPageView({model: this.donor});
        
        ////Login Page
        //this.loginPageView = new LoginPage;
        
        //console.log("Making the router!");
        ////Navigate to the donation form page, 
        ////rendering the donation form page
        //this.Router = new Router;
        
        //console.log("Just made the router");
        //return this;
      }

    return {initialize: initialize}; 
  });
