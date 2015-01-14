
(function(){
  $(document).ready(function() {
    window.Message = Backbone.Model.extend({
      defaults: function() {
        return {
          error: "",
          warning: "",
          message: "",
          success: ""
        }
      },
    });
  });
}).call(this);
