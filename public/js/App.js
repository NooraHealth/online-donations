define([
  // These are path alias that we configured in our bootstrap
  'backbone',
  'router'
], function(Backbone, Router){
      var initialize = function() {
        console.log(Router);
        Router.navigate('donationForm', {trigger: true}); 
      }

    return {initialize: initialize}; 
  });
