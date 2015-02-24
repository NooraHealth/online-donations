define([
  // These are path alias that we configured in our bootstrap
  'backbone',
  'router'
], function(Backbone, Router){
  
    /*
    * This Backbone prototype extension handles all of the event unbinding
    * and html removal necessary to properly remove a backbone view from the
    * DOM. It calls $().remove() as well as unbinds the events. If
    * a class instantiates an onClose() function, then that function will be called.
    * in the onClose function, views can unbind themselves from model change events, etc.
    */
    Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };
      
    var initialize = function() {
      Router = new Router();
      Backbone.history.loadUrl(Backbone.history.fragment );
    }
    
    return {initialize: initialize}; 
  });
