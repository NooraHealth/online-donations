(function(){
  $(document).ready(function() {

    window.Router = Backbone.Router.extend({
      routes: {
        "login": "login"
      }, 
    
      login: function() {
        LoginPageView.render();
      },

    });

    Backbone.history.start();
  });
}).call(this); 
