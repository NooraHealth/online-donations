
(function(){
  $(document).ready(function() {

    window.ConsoleRouter = Backbone.Router.extend({

      routes: {
        "login": "login",
        "donations": "donationForm",
      }, 

      donationForm: function() {
        console.log("Rendering the donationFormView");
        App.donationFormView.render();  
      },
    
      login: function() {
        App.loginPageView.render();
      },

    });

    Backbone.history.start();
  });
}).call(this); 
