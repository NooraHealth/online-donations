
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
  'models/Donor',
  'models/RepeatDonation',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, giveAgainFormTemplate, MessageView, Message, Donor, RepeatDonation){

    var GiveAgainFormView = Backbone.View.extend({
    
      el: "#modal",
      
      initialize: function () {
        this.model = new RepeatDonation();
        this.listenTo(this.model, 'invalid', this.displayError);
      },

      displayError: function(error) {
        console.log("Displaying the invalid error: ", error);
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
        "click button[name=donationBar]": "fillDonationBox"
      },

      giveAgain: function() {
         var data = {
            amount: $("input[name=amount]").val() * 100,
            donorID: Donor.get('id'),
            planID: Donor.getPlanID(),
            subscriptionID: Donor.getSubscriptionID(),

            //Use the monthly donation checkbox determine whether this
            //should be ferried to create a new plan for the donor
            //or create another one time donation.
            editMembership: $("input[name=monthly").is(':checked') ,
            onetime: !$("input[name=monthly").is(':checked') ,
         }

        //disable the submit button so they can't submit again
        this.giveAgainSubmitButton().prop('disabled', true);

        this.model.save(data, {error: this.handleError.bind(this), success: this.handleResponse.bind(this)});
      },  
      
      handleError: function() {
        this.message.set({error: "There was an error completing your request. Please try again."});
        this.resetForm();  
      },

      handleResponse: function(model,response) {
        console.log("Recieved a response from the server: ", response);
        if ( response.error ) {
          this.message.set({error: response.error});
          this.resetForm();  
        } 
        else {
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
        var html = giveAgainFormTemplate({successMessage: "Thank You for your support!"});
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
