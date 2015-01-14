(function(){
  $(document).ready(function() {
    var App = Backbone.View.extend({
      initialize: function() {
        //Create the donation form view
        this.donationFormView = new DonationForm;

        //Create the messages view
        this.message = new Message;
        this.messageView = new MessageView({model: this.message});

        //Create the navbar view
        this.navbarView = new NavbarView;

        //Login Page
        this.LoginPageView = new LoginPage;

        this.Router = new Router;
      },
    });
    window.App = new App;
  });
}).call(this);
