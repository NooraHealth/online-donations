
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
  'views/Bases/FormBase',
  'bootstrap'
], function($, _, Backbone, Handlebars, editMembershipModal, Message, MessageView, RepeatDonation, FormBase ){
    
    var EditMembershipView = FormBase.extend({
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

      amount: function() {
        return $("input[name=amount]");
      },
      
      events: {
        "click #edit-membership-submit": "submitEdit",
        "submit #edit-membership-form" : "handlePressEnterEvent"
      },      
      
      handlePressEnterEvent: function(event) {
        if (event.keyCode= 13) {
          return false;
        }
      },
      
      initialize: function(options) {
        console.log("this is the modal base");
        console.log(this);
        this.donor = options.donor;
        this.model = new RepeatDonation();
        this.listenTo(this.model, 'invalid', this.handleValidationError);
      },

      showSuccessMessage: function() {
        this.message.clear();
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
            email: this.donor.get('email'),
            editMembership: true
         }

        //disable the submit button so they can't submit again
        this.submitEdits().prop('disabled', true);
        this.model.save(data, {error: this.handleServerError.bind(this), success: this.handleResponse.bind(this)});
        
      },
      
      handleResponse: function(response) {
        if (response.get('error')) {
          this.handleServerError(response.get('error'));
          this.model.set({error: null});
        } else{
          console.log("about to show the successMessage");
          //Update the client side subscriptions
          var newSubscription = _.clone(this.donor.get('subscriptions'));
          newSubscription.data[0] = response.get('subscription');
          this.donor.set({subscriptions: newSubscription});

          //IMPORTANT: figure out what is making this necessary -- this should automatically update
          this.donor.trigger('change');
          this.showSuccessMessage();
        }
      },
      
      resetForm: function(){
        this.editMembershipForm()[0].reset();
        this.submitEdits().prop('disabled', false);
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
