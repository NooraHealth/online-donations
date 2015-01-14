(function(){
  $(document).ready(function() {

    window.Router = Backbone.Router.extend({

      routes: {
        "login": "login",
        "donationForm": "donationForm",
      }, 

      donationForm: function() {
        App.donationPageView.render();  
      },
    
      login: function() {
        App.loginPageView.render();
      },

    });

    Backbone.history.start();
  });
}).call(this); 
