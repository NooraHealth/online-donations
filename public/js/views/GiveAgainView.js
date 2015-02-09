
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/giveAgainModal',
  'views/MessageView',
  'models/Message',
  'models/RepeatDonation',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, giveAgainFormTemplate, MessageView, Message, RepeatDonation){

    var GiveAgainFormView = Backbone.View.extend({
    
      el: "#modal",
      
      initialize: function (options) {
        this.donor = options.donor;
        this.model = new RepeatDonation();
        this.listenTo(this.model, 'invalid', this.displayError);
      },

      displayError: function(error) {
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.giveAgainSubmitButton().prop('disabled',false);
      },
      
      giveAgainSubmitButton: function() {
        return $("#submit-give-again");
      },
      
      modal: function() {
        return $("#give-again-modal");
      },
      
      giveAgainForm: function() {
        return $("#give-again-form");
      },

      successMessage: function() {
        return $("#success-message");
      },
      
      donationBox: function() {
        return $("input[name=amount]");
      },

      displayError: function(error) {
        //Display the error to the user
        this.message.set({error: error.validationError});
        
        //enable the submit button for resubmission
        this.giveAgainSubmitButton().prop('disabled', false);
      },

      events: {
        "click #submit-give-again": "giveAgain",
        "click button[name=donationBar]": "fillDonationBox",
        "submit #give-again-form" : "handlePressEnterEvent"
      },      
      
      handlePressEnterEvent: function(event) {
        if (event.keyCode= 13) {
          return false;
        }
      },

      giveAgain: function() {
         var data = {
            amount: $("input[name=amount]").val() * 100,
            donorID: this.donor.get('id'),
            planID: this.donor.getPlanID(),
            subscriptionID: this.donor.getSubscriptionID(),

            //Use the monthly donation checkbox determine whether this
            //should be ferried to create a new plan for the donor
            //or create another one time donation.
            editMembership: $("input[name=monthly]").is(':checked') ,
            onetime: !$("input[name=monthly]").is(':checked') ,
         }

        //disable the submit button so they can't submit again
        this.giveAgainSubmitButton().prop('disabled', true);

        this.model.save(data, {error: this.handleError.bind(this), success: this.handleResponse.bind(this)});
      },  
      
      handleError: function(err) {
        this.message.set({error: err.message});
        this.resetForm();  
      },

      handleResponse: function(model,response) {
        if ( response.error ) {
          this.message.set({error: response.error});
          this.resetForm();  
        } 
        else {
          //If this was a onetime donation, then update the Donor's donation array
          if (response.donation) {
            newDonations = _.clone(this.donor.get('donations'));
            newDonations.unshift(response.donation);
            this.donor.set({donations: newDonations});
          }
          else {
            var newSubscription = _.clone(this.donor.get('subscriptions'));
            newSubscription.data[0] = response.subscription;
            this.donor.set({subscriptions: newSubscription});
            
            //IMPORTANT: figure out what is making this necessary -- this should automatically update
            this.donor.trigger('change');
          }

          this.showSuccessMessage();
        }
      },

      
      fillDonationBox: function(e) {
        e.preventDefault();
        this.donationBox().val(e.target.value);
      },

      showSuccessMessage: function() {
        this.giveAgainForm().hide();
        this.giveAgainSubmitButton().hide();
        this.successMessage().show(); 
      },

      resetForm: function(){
        this.giveAgainForm()[0].reset();
        this.giveAgainSubmitButton().prop('disabled', false);
      },
      
      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },

      render: function() {
        var html = giveAgainFormTemplate( {donor: this.donor.toJSON(), successMessage: "Thank you for your support!"});
        this.$el.html(html);      

        this.successMessage().hide();

        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#give-again-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return GiveAgainFormView;
  });
