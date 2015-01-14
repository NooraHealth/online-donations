
(function(){
  $(document).ready(function() {
    window.LoginPage = Backbone.View.extend({
      el: "#body",

      render: function() {
        console.log("Rendering the loginpage template");
        var src = $("#login-template").html();
        var template = Handlebars.compile(src);
        var html = template();
        this.$el.html(html);      
      }
    });
  });
}).call(this);
