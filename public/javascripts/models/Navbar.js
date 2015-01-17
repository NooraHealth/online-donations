
/**
 *
 * What kind of buttons do we want to have on the navbar for 
 * the various pages?
 */
(function(){
  $(document).ready(function() {
    window.Navbar = Backbone.Model.extend({
      defaults: function() {
        return {
          login: true,
          logout: true
        }
      },
    });
  });
}).call(this);
