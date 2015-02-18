define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'views/LoginBase',   
  'hbs!templates/forgotPasswordModal',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, forgotPasswordTemplate, Message, MessageView ){
    
    var ForgotPassword = Backbone.View.extend({
      el: "#modal",

      hide: function() {
        $('#forgot-password-modal').modal('hide');
      },

      show: function() {
        $('#forgot-password-modal').modal('show');
      },

      render: function() {
        var html = forgotPasswordTemplate();
        this.$el.html(html);      
       
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#forgot-password-message")}); 
        this.messageView.render();
      }
    });
    return ForgotPassword;
  });
