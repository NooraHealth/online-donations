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
        var html = template(this.model.attributes);
        this.$el.html(html);      
        
        //set the element of the message box
        this.messageView.$el = $("#message-box");

        //set the navbar settings
        App.navbar.set({login: false, logout: true});
        return this;
      },
      
    });
  });
}).call(this);
