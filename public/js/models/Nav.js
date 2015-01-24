
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
        if(page == 'giving') {
          this.set({login:true});
          this.set({logout:false});
          this.set({donorConsole:false});
        }
        if(page == 'welcome') {
          this.set({login:false});
          this.set({logout:true});
          this.set({donorConsole:true});
        }
        if(page == 'console') {
          this.set({login:false});
          this.set({logout:true});
          this.set({donorConsole:false});
        }
      }
    
   }); 
  
  return new Nav();
});
