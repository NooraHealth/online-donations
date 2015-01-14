
(function(){
  $(document).ready(function() {
    window.LoginPageView = Backbone.View.extend({
      el: "#body",

      render: function() {
        var src = $("#login-template").html();
        var template = Handlebars.compile(src);
        var html = template();
        this.$el.html(html);      
      }
    });
  });
}).call(this);
