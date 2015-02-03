
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var Nav = Backbone.Model.extend({
      defaults: {
        login:true,
        logout:false,
        donorConsole:false
      }, 

      setPage: function(page) {
        var loggedIn = this.get('donor').isLoggedIn();
        if(loggedIn) {
          this.set({logout:true});
          this.set({login:false});
          this.set({donorConsole: true});
        } else{
          this.set({login:true});
          this.set({logout:false});
          this.set({donorConsole:false});
        }
        
        if(page == 'console') {
          this.set({donorConsole:false});
        }
      }
    
   }); 
  
  return Nav;
});
