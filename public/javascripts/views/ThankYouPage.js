
(function(){
  $(document).ready(function() {
    window.ThankYouPageView = Backbone.View.extend({

      el: "#body" ,
      
      render: function() {
        App.navbar.set({login: false, logout: true});

        var src = $("#thank-you-page-template").html();
        var template = Handlebars.compile(src);
        var html = template(this.model);
        this.$el.html(html);      
        return this;
      },
      
    
    });
  });
}).call(this);

