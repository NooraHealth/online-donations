define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'hbs!templates/forgotPassword',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, forgotPasswordTemplate, Message, MessageView ){
    
    var ForgotPasswordModal = Backbone.View.extend({
      el: "#body",

      render: function() {
        console.log("rendering the forgot password");
        var html = forgotPasswordTemplate();
        this.$el.html(html);      
       
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#forgot-password-message")}); 
        this.messageView.render();
      }
    });

    return ForgotPasswordModal;
  });
