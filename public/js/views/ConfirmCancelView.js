define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'hbs!templates/confirmCancelModal',
  'models/Message',
  'views/MessageView',
  'models/RepeatDonation',
  'models/Donor',
  'bootstrap'
], function($, _, Backbone, Handlebars, confirmCancelModal, Message, MessageView, RepeatDonation, Donor ){
    
    var ConfirmCancelView = Backbone.View.extend({
      el: "#modal",
      
      modal: function() {
        return $("#confirm-cancel-modal");
      },
      
      confirmCancelSubmit: function() {
        return $("#confirm-cancelation");
      },
      
      confirmCancel: function() {
        return $("#are-you-sure");
      },

      successMessage: function() {
        return $("#success-message");
      },

      initialize: function() {
        this.model = new RepeatDonation();
        this.listenTo(this.model, 'invalid', this.displayError);
      },

      displayError: function(error) {
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.confirmCancelSubmit().prop('disabled',false);
      },
      
      events: {
        "click #confirm-cancel-membership": "cancelMembership"
      },
      
      showSuccessMessage: function(response) {
        this.successMessage().show();
        this.confirmCancel().hide();
      },     
      
      showConfirmCancel: function() {
        this.successMessage().hide();
        this.confirmCancel().show();
      },

      cancelMembership: function() {
         var data = {
            amount: 0,
            donorID: Donor.get('id'),
            planID: Donor.getPlanID(),
            subscriptionID: Donor.getSubscriptionID(),
            editMembership: true
         }

        //disable the submit button so they can't submit again
        this.confirmCancelSubmit().prop('disabled', true);

        this.model.save(data, {error: this.handleError.bind(this), success: this.handleResponse.bind(this)});
      },

      handleResponse: function(response) {
        if (response.get('error')) {
          this.message.set({error: response.get('error')});
          this.confirmCancelSubmit().prop('disabled',false);
        } else{
          console.log("showing the successmessage");
          //Update the client side subscriptions
          console.log(Donor.get('subscriptions'));
          var newSubscription = Donor.get('subscriptions');
          newSubscription.data[0] = response.get('subscription');
          console.log("Heres the new subscription");
          Donor.set({subscriptions: newSubscription});
          console.log(Donor.get('subscriptions'));
          this.showSuccessMessage();
        }
      },

      handleError: function(response) {
        console.log ("This is the response: ", response);
        this.message.set({error: "there was an error completing your request. please try again."});
      },     

      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },

      render: function() {
        var html = confirmCancelModal({successMessage: "Your monthly donation has been cancelled."});
        this.$el.html(html);      
        
        this.showConfirmCancel();

        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#confirm-cancel-message")}); 
        this.messageView.render();
      }
    });

    return ConfirmCancelView;
  });
