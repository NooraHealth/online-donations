(function(){
  $(document).ready(function() {
    window.NavbarView = Backbone.View.extend({

      el: "#noora-nav" ,
    
      events: {
       "click .login": "navigateToLogin"
      },

       navigateToLogin: function() {
          console.log("Navigating to the login");
          App.Router.navigate("login", {trigger: true});
       },
    
    });
  });
}).call(this);

