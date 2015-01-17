
(function(){
  $(document).ready(function() {
    window.MessageView = Backbone.View.extend({
      
      el: $('#message-box'),

      initialize: function() {
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
        this.$el.text(App.message.get("error"));      
        return this;
      },

      renderMessage: function() {
        console.log("rendering the message");
        this.$el.text(App.message.get("message"));      
        return this;
      },

      renderWarning: function() {
        console.log("rendering the message");
        this.$el.text(App.message.get("warning"));      
        return this;
      },
      renderSuccess: function() {
        this.$el.text(App.message.get("success"));      
        return this;
      },
    });
  });
}).call(this);
