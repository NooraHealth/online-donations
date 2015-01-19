define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'models/Message'
], function($, _, Backbone, Message){
    var MessageView = Backbone.View.extend({
      
      el: $('#message'),

      initialize: function() {
        this.model = Message;
        console.log(this.model);
        this.listenTo(this.model, 'change:error', this.renderError);
        this.listenTo(this.model, 'change:message', this.renderMessage);
        this.listenTo(this.model, 'change:warning', this.renderWarning);
        this.listenTo(this.model, 'change:success', this.renderSuccess);
      },

      //class: "message-box",

      //el: "#message-box",

      clear: function() {
        this.$el.text();
      },

      renderError: function() {
        console.log("rendering the error");
        console.log(this);
        this.$el.text(Message.get("error"));      
        return this;
      },

      renderMessage: function() {
        console.log("rendering the message");
        this.$el.text(Message.get("message"));      
        return this;
      },

      renderWarning: function() {
        console.log("rendering the message");
        this.$el.text(Message.get("warning"));      
        return this;
      },
      renderSuccess: function() {
        this.$el.text(Message.get("success"));      
        return this;
      },
    });
    return new MessageView();
  });
