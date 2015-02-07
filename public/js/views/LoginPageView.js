
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'views/LoginBase',
  'hbs!templates/loginPageTemplate',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, LoginBase, loginPageTemplate, Message, MessageView ){
    
    var LoginPage = LoginBase.extend({
      el: "#modal",
      
      render: function() {
        var html = loginPageTemplate();
        this.$el.html(html);      
       
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#login-message")}); 
        this.messageView.render();
      }

    });
    
    return LoginPage;
});
