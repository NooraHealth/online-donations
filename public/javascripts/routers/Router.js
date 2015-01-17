(function(){
  $(document).ready(function() {

    window.Router = Backbone.Router.extend({

      routes: {
        "login": "login",
        "donations": "donationForm",
        "donors" : "donorConsole",
        "thankyou" : "thankYouPage"
      }, 

      thankYouPage: function() {
        console.log("Rendering the thankyouPageView");
        App.thankYouPageView.render();  
      },

      donationForm: function() {
        console.log("Rendering the donationFormView");
        App.donationFormView.render();  
      },
    
      login: function() {
        App.loginPageView.render();
      },

      donorConsole: function() {
        console.log("inthe donor console functino in router");
        App.donorConsoleView.render();
      }
    });

    Backbone.history.start();
  });
}).call(this); 
