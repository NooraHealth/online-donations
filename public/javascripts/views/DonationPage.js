
(function(){
  $(document).ready(function() {
    var DonationPageView = Backbone.View.extend({
      initialize: function() {
        //Create the donation form view
        this.donationFormView = new DonationForm;

        //Create the messages view
        this.message = new Message;
        this.messageView = new MessageView({model: this.message});

        //Create the navbar view
        this.navbarView = new NavbarView;
      },
    });
    window.DonationPageView = new DonationPageView;
  });
}).call(this);
