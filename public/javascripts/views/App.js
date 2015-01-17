(function(){
  $(document).ready(function() {
    var App = Backbone.View.extend({
      initialize: function() {
        
        //DonorConsole
        this.donor = new Donor;
        this.donorConsoleView = new DonorConsole({model: this.donor});
        
        //Create the donation form view
        this.donationFormView = new DonationForm;

        //Create the messages view
        this.message = new Message;
        this.messageView = new MessageView({model: this.message});
        
        //Create the navbar view
        this.navbar = new Navbar;
        this.navbarView = new NavbarView({model: this.navbar});

        //Login Page
        this.thankYouPageView = new ThankYouPageView({model: this.donor});
        
        //Login Page
        this.loginPageView = new LoginPage;
        
        console.log("Making the router!");
        //Navigate to the donation form page, 
        //rendering the donation form page
        this.Router = new Router;
        
        return this;
      },
    });
    window.App = new App();
    
    //Having initialized the app, go to the first page of the app
    
  });
}).call(this);
