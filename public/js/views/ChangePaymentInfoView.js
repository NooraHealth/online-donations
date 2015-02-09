
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/changePaymentInfo',
  'views/MessageView',
  'models/Message',
  'views/FormBase',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, changePaymentInfoTemplate,  MessageView, Message, FormBase){

    var ChangePaymentInfo = FormBase.extend({
    
      el: "#modal",

      submitChanges: function () {
        return this.$('#submit-payment-changes');
      },
      
      form: function() {
        return $("#change-payment-form");
      },
      
      modal: function() {
        return $("#change-payment-modal");
      },
      
      showSuccessMessage: function(response) {
        this.message.clear();
        this.successMessage().show();
        this.submitChanges().hide();
        this.form().hide();
      },     
      
      showPaymentChangesForm: function() {
        this.successMessage().hide();
        this.submitChanges().show();
        this.form().show();
      },

      initialize: function(options) {
        this.donor = options.donor;
        this.router = options.router;
      },

      disableSubmitButton: function (state) {
        this.submitChanges().prop('disabled', state);
      },

      /*
       * Returns the change payment form jquery object
       */
      form: function() {
        return this.$el.find("#change-payment-form");
      },

      events: {
        "click #submit-payment-changes": "createStripeToken",
      },

      //THESE THINGS NEED TO BE MOVED INTO A SINGLE/MODEL 
      //TOO MUCH REPETITION OF CODE
      /*
       * Parse expiration input for use by Stripe
       */
      parseExpiration: function() {
        var exp = $("#expiration").val();
        if (exp.length < 7)
          return;

        var month = exp.substring(0,2);
        var year = exp.substring(3);
        
        $("#expyear").val(year);
        $("#expmonth").val(month);
      },
      
      /*
       * Callback for Stripe.card.createToken(...)
       */
      stripeResponseHandler: function(status, response){
        if(response.error) {
          this.handleServerError(response.error);
        } else{
          var token = response.id;
          
          var data = {
            stripeToken: token,
          }

          this.disableSubmitButton(true);

          $.post('/donors/changeDonorCard/' + this.donor.get('id'), data)
          .done(this.handleResponse.bind(this))
          .fail(this.handleServerError.bind(this));
        }
      },


      handleResponse: function(response) {
        if ( response.error ) {
          this.handleServerError(response.error);
          return;
        } 
        if ( response.donor ) {
          this.donor.set(response.donor);

          //IMPORTANT: figure out what is making this necessary -- this should automatically update
          //this.donor.trigger('change');
          this.showSuccessMessage();
          return;
        }

        this.handleServerError({error: {message: "There was an error completing your request. Please try again"}});
      },

      /*
       * Retrieve a CC token from Stripe
       */
      createStripeToken: function(event) {
        event.preventDefault();
        
        this.parseExpiration();
        this.$("#submit-changes").prop('disabled', true);
        Stripe.card.createToken(this.form(), (this.stripeResponseHandler).bind(this));

        //Prevent form from submitting
        return false; 
      },

      //reset form fields
      resetForm: function() {
        this.form()[0].reset();
        $("#submit-donation").prop('disabled', false);
      },

      render: function() {
        var html = changePaymentInfoTemplate({donor: this.donor.toJSON(), successMessage: "Your payment information has been saved."});
        this.$el.html(html);      
        
        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#change-payment-message")}); 
        this.messageView.render();
        
        this.showPaymentChangesForm();

        return this;
      }
    });

    return ChangePaymentInfo;
  });
