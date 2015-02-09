define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'views/LoginBase',   
  'hbs!templates/loginModal',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, LoginBase, loginTemplate, Message, MessageView ){
    
    var LoginModal = LoginBase.extend({
      el: "#modal",

      hide: function() {
        $('#login-modal').modal('hide');
      },

      show: function() {
        $('#login-modal').modal('show');
      },

      render: function() {
        var html = loginTemplate();
        this.$el.html(html);      
       
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#login-message")}); 
        this.messageView.render();
      }
    });
    return LoginModal;
  });
