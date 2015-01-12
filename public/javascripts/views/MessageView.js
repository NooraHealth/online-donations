
(function(){
  $(document).ready(function() {
    window.MessageView = Backbone.View.extend({

      initialize: function() {
        console.log(this.model);
        this.listenTo(this.model, 'change:error', this.renderError);
      },

      //class: "message-box",

      //el: "#message-box",

      renderError: function() {
        console.log("There was an error!", DonationPageView.message.attributes.error);
        $('#message-box').text(DonationPageView.message.get("error"));      
      },
    });
  });
}).call(this);
