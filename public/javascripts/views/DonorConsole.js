(function(){
  $(document).ready(function() {
    window.DonorConsole = Backbone.View.extend({
      
      el: "#body",

      initialize: function() {
      },

      render: function() {
        console.log("Rendering the donorConsole");
        var src = $("#donor-console-template").html();
        var template = Handlebars.compile(src);
        var html = template(this.model);
        this.$el.html(html);      
        return this;
      },
      
    });
  });
}).call(this);
