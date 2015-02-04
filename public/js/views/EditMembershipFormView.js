
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'hbs!templates/editMembershipModal',
  'models/Message',
  'views/MessageView',
  'models/RepeatDonation',
  'bootstrap'
], function($, _, Backbone, Handlebars, editMembershipModal, Message, MessageView, RepeatDonation ){
    
    var EditMembershipView = Backbone.View.extend({
      el: "#modal",
      
      submitEdits: function() {
        return $("#edit-membership-submit");
      },
      
      modal: function() {
        return $("#edit-membership-modal");
      },
      
      editMembershipForm: function() {
        return $("#edit-membership-form");
      },

      successMessage: function() {
        return $("#success-message");
      },
      
      amount: function() {
        return $("input[name=amount]");
      },
      
      events: {
        "click #edit-membership-submit": "submitEdit",
      },
      
      initialize: function(options) {
        this.donor = options.donor;
        console.log(this.donor.get('subscriptions'));
        this.model = new RepeatDonation();
        this.listenTo(this.model, 'invalid', this.displayError);
      },

      displayError: function(error) {
        console.log("Displaying the invalid error: ", error);
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.submitEdits().prop('disabled',false);
        this.confirmCancelSubmit().prop('disabled', false);
      },
      
      showSuccessMessage: function() {
        this.editMembershipForm().hide();
        this.successMessage().show();
        this.submitEdits().hide();
      },     
      
      showEditMembershipForm: function() {
        this.editMembershipForm().show();
        this.successMessage().hide();
        this.submitEdits().show();
      },     
      
      submitEdit: function(e) {
        var data = {
            amount:  $("input[name=amount]").val() * 100,
            donorID: this.donor.get('id'),
            planID: this.donor.getPlanID(),
            subscriptionID: this.donor.getSubscriptionID(),
            editMembership: true
         }

        //disable the submit button so they can't submit again
        this.submitEdits().prop('disabled', true);
        this.model.save(data, {error: this.handleError.bind(this), success: this.handleResponse.bind(this)});
        
      },
      
      handleResponse: function(response) {
        if (response.get('error')) {
          this.message.set({error: response.get('error')});
          this.submitEdits().prop('disabled',false);
        } else{
          //Update the client side subscriptions
          var newSubscription = _.clone(this.donor.get('subscriptions'));
          newSubscription.data[0] = response.get('subscription');
          this.donor.set({subscriptions: newSubscription});

          //IMPORTANT: figure out what is making this necessary -- this should automatically update
          this.donor.trigger('change');
          this.showSuccessMessage();
        }
      },

      handleError: function() {
        this.message.set({error: "there was an error completing your request. please try again."});
        this.resetform();  
      },     
      
      resetForm: function(){
        this.editMembershipForm()[0].reset();
        this.submitEdits().prop('disabled', false);
      },

      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },

      render: function() {
        var html = editMembershipModal({donor: this.donor.toJSON(), successMessage: "Your changes have been saved!"});
        this.$el.html(html);      
        
        this.showEditMembershipForm();

        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#edit-membership-message")}); 
        this.messageView.render();
      }
    });
    return EditMembershipView;
  });
