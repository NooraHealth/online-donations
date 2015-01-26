
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var Donor = Backbone.Model.extend({
      defaults: {
        email: null
    }
   }); 
  
  return new Donor();
});