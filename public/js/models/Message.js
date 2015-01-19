

define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone'    // lib/backbone/backbone
], function($, _, Backbone){
    var Message = Backbone.Model.extend({
      defaults: function() {
        return {
          error: "",
          warning: "",
          message: "",
          success: ""
        }
      },
    });
    return new Message();
});
