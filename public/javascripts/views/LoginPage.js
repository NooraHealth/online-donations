
(function(){
  $(document).ready(function() {
    window.LoginPage = Backbone.View.extend({
      el: "#body",
      events: {
        "click .donation-form": "navigateToDonationForm"
      },

      navigateToDonationForm: function() {
        App.Router.navigate("donations", {trigger: true});
      },

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
