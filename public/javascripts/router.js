(function(){
  $(document).ready(function() {

    window.Router = Backbone.Router.extend({
      routes: {
        "login": "login"
      }, 
    
      login: function() {
        
      },

    });

    Backbone.history.start();
  });
}).call(this); 
