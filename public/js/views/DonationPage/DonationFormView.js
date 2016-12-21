define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'stripe',
  'hbs!templates/donationForm',
  'views/MessageView',
  'models/Message',
  'models/Donation',
  'views/Bases/FormBase'
], function($, _, Backbone, Handlebars, Stripe, donationFormTemplate,  MessageView, Message, Donation, FormBase ){

    var DonationForm = FormBase.extend({

      el: "#body",

      donationBox: function() {
        return $("input[name=amount]");
      },

      submitDonation: function () {
        return this.$('#submit-donation');
      },


      initialize: function(options) {
        this.donor = options.donor;
        this.router = options.router;
        this.initialLoad = options.initialLoad;
        this.model = new Donation();
        this.listenTo(this.model, 'invalid', this.handleValidationError);
      },


      disableSubmitButton: function (state) {
        this.submitDonation().prop('disabled', state);
      },

      /*
       * Returns the donation form jquery object
       */
      form: function() {
        return this.$el.find("#donation-form");
      },

      events: {
        "click #submit-donation": "createStripeToken",
        "click button[name=donationBar]": "fillDonationBox"
      },

      fillDonationBox: function(e) {
        e.preventDefault();
        this.donationBox().val(e.target.value);
      },

      /*
       * Parse expiration input for use by Stripe
       */
      parseExpiration: function() {
        var exp = $("input[name=expiration]").val();
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
        console.log(response);
        console.log(status);
        if(response.error) {
          this.message.set({error: response.error.message});
          this.disableSubmitButton(false);
        } else{
          var token = response.id;

          var data = {
            stripeToken: token,
            name: $("input[name=name]").val(),
            password: $("input[name=password]").val(),
            confirm: $("input[name=confirm]").val(),
            email: $("input[name=email]").val(),
            amount: $("input[name=amount]").val() * 100,
            monthly: $("input[name=monthly]").is(':checked') ,
            newsletter: $("input[name=newsletter]").is(':checked')
          }

          this.disableSubmitButton(true);
          this.model.save(data, {error: this.handleServerError.bind(this), success: this.handleResponse.bind(this)} );

        }
      },

      handleResponse: function(model,response) {
        console.log("in rthe handle response");
        if ( response.error ) {
          this.handleServerError(response.error);
        }
        if ( response.donor ) {
          console.log("the response");
          console.log(response);
          this.donor.set( response.donor );
          this.donor.set( {count: response.count} );
          this.donor.set({donations: response.donations.data});

          this.message.clear();
          this.message.set({success: response.success});
          this.router.navigate('thankyou', {trigger: true});
        }
      },

      /*
       * Retrieve a CC token from Stripe
       */
      createStripeToken: function(event) {
        event.preventDefault();
        console.log("creating stripe token");
        var donation = new Donation();
        this.parseExpiration();
        this.$("#submit-donation").prop('disabled', true);
        //hack to deal with hidden form fields with data-stripe
        $("div:hidden").remove();
        Stripe.card.createToken(this.form(), (this.stripeResponseHandler).bind(this));

        //Prevent form from submitting
        return false;
      },

      //reset form fields
      resetForm: function() {
        this.form()[0].reset();
        $("#submit-donation").prop('disabled', false);
      },

      render: function( initialLoad ) {
        console.log("Rendering initialLoad");
        if( !this.initialLoad ) {
          var html = donationFormTemplate();
          this.$el.html(html);
          this.initialLoad = false;
        }

        //Set the el of the form message view now that the form has been rendered
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#form-message")});
        this.messageView.render();

        if (this.donor.isLoggedIn()) {
          //disable the form submit button so no new donor can be created while loggedIn
          this.disableSubmitButton(true);
          this.message.set({error: "Please log out to register a new donor"});
        }

        return this;
      }
    });

    return DonationForm;
  });
