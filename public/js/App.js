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
      
      console.log("initializing the app");
      var path = window.location.pathname;
      var hash = window.location.hash;
      
      //a hack that resets the router, avoiding the problem 
      //initialize the app on a hash
      if (path == '/') {
        Router.navigate('/');
        if (hash == "#login") {
          Router.navigate('login', {trigger: true});
        }
        else {
          Router.navigate('giving', {trigger: true}); 
        }
      }

      //if (path == '/login') {
        //console.log("trying to nav to login");
        //Router.navigate('/');
        //Router.navigate('login', {trigger: true});
      //}

      //if (path == '/donors') {
        //Router.navigate('/');
        //Router.navigate('nooradonors', {trigger: true});
      /*}*/

      //Route according to the hash in the URL as well as whether the user is logged in or not
    }
    
    return {initialize: initialize}; 
  });
