
(function(){
  $(document).ready(function() {
    window.MessageView = Backbone.View.extend({

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
        $('#message-box').text();
      },
      renderError: function() {
        $('#message-box').text(DonationPageView.message.get("error"));      
      },
      renderMessage: function() {
        $('#message-box').text(DonationPageView.message.get("message"));      
      },
      renderWarning: function() {
        $('#message-box').text(DonationPageView.message.get("warning"));      
      },
      renderSuccess: function() {
        $('#message-box').text(DonationPageView.message.get("success"));      
      },
    });
  });
}).call(this);
