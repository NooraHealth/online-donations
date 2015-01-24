define([
  // These are path alias that we configured in our bootstrap
  'backbone',
  'router'
], function(Backbone, Router){
      var initialize = function() {
        Router.navigate('giving', {trigger: true}); 
      }

    return {initialize: initialize}; 
  });
