
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
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, changePaymentInfoTemplate,  MessageView, Message){

    var ChangePaymentInfo = Backbone.View.extend({
    
      el: "#modal",

      submitChanges: function () {
        return this.$('#submit-payment-changes');
      },
      
      modal: function() {
        return $("#change-payment-modal");
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
        console.log("stripe response hadler");
        if(response.error) {
          this.message.set({error: response.error.message});
          this.disableSubmitButton(false);
        } else{
          var token = response.id;
          
          var data = {
            stripeToken: token,
          }

          this.disableSubmitButton(true);
          //this.model.save(data, {error: this.handleError.bind(this), success: this.handleResponse.bind(this)} );

          $.post('/donors/changeDonorCard/' + this.donor.get('id'), data)
          .done(this.handleResponse.bind(this))
          .fail(this.handleError.bind(this));
        }
      },
      
      handleError: function(response) {
        console.log("THERE WAS A ERROR: ", response);
        //this.message.set({error: "There was an error completing your request. Please try again."});
        //this.resetForm();  
      },

      handleResponse: function(model,response) {
        console.log("THERE WAS A RESPONSE: ", response);
        /*if ( response.error ) {*/
          //this.message.set({error: response.error});
          //this.resetForm();  
        //} 
        //if ( response.donor ) {
          //this.donor.set(response.donor);
          //this.message.set({success: response.success});
          //this.router.navigate('thankyou', {trigger: true});
        /*}*/
      },

      /*
       * Retrieve a CC token from Stripe
       */
      createStripeToken: function(event) {
        console.log("creatinga stripe token");
        event.preventDefault();
        //if ( this.verifyInput() ) {
          this.parseExpiration();
          this.$("#submit-changes").prop('disabled', true);
          Stripe.card.createToken(this.form(), (this.stripeResponseHandler).bind(this));
        //}

        //Prevent form from submitting
        return false; 
      },

      hide: function() {
        this.modal().modal('hide');
      },

      show: function() {
        this.modal().modal('show');
      },
      //reset form fields
      resetForm: function() {
        this.form()[0].reset();
        $("#submit-donation").prop('disabled', false);
      },

      render: function() {
        var html = changePaymentInfoTemplate(this.donor.toJSON());
        this.$el.html(html);      
        
        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#change-payment-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return ChangePaymentInfo;
  });
