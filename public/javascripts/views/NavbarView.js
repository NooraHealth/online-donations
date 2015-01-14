(function(){
  $(document).ready(function() {
    window.NavbarView = Backbone.View.extend({
    
      events: {
       "click .login": "navigateToLogin"
      },

       navigateToLogin: function() {
          console.log("Navigating to the login");
          Router.navigate("login", {trigger: true});
       },
    
    });
  });
}).call(this);

