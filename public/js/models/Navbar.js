
/**
 *
 * What kind of buttons do we want to have on the navbar for 
 * the various pages?
 */
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var Navbar = Backbone.Model.extend({
      defaults: function() {
        return {
          login: false,
          logout: true
        }
      },
    });
    return new Navbar();
});
