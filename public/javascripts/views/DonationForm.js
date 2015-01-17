(function(){
  $(document).ready(function() {

    window.DonationForm = Backbone.View.extend({
    
      //tagName: "form",
      el: "#body",

      initialize: function() {
      },

      /*
       * Returns the donation form jquery object
       */
      form: function() {
        return this.$el.find("#donation-form");
      },

      events: {
        "submit #donation-form": "createStripeToken",
      },
      
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
       * Verify the donation form input before posting to server
       */
      verifyInput: function() {
        if (this.$("input[name=password]").val() != this.$("input[name=confirm]").val()) {
          App.message.set({error: "Your passwords do not match"});
          return false;
        }
          
        return true;
      },
      
      /*
       * Callback for Stripe.card.createToken(...)
       */
      stripeResponseHandler: function(status, response){
        if(response.error) {
          console.log("Hadnling error from Stripe");
          //$('#message-box').text(response.error.message);      
          App.message.set({error: response.error.message});
          this.$('#submit-donation').prop('disabled',false);
        } else{
          var token = response.id;
          console.log("POsting to server data");
          
          var data = {
            stripeToken: token,
            name: $("input[name=name]").val(),
            password: $("input[name=password]").val(),
            email: $("input[name=email]").val(),
            amount: $("input[name=amount]").val() * 100,
            monthly: $("input[name=monthly").is(':checked') 
          }

          //Submit the donation  
          var promise = $.post ("/donations/submit", data, function() {
            console.log("Sentout the post");
          })
            .done(this.handleResponse.bind(this))
            .fail(this.handleError.bind(this))
        }
      },
      
      handleError: function() {
        App.message.set({error: "There was an error completing your request. Please try again."});
        this.resetForm();  
      },

      handleResponse: function(response) {
        if ( response.error ) {
          App.message.set({error: response.error});
          this.resetForm();  
        } 
        if ( response.donor ) {
          App.donor.set(response.donor);
          App.message.set({success: response.success});
          App.Router.navigate('thankyou', {trigger: true});
        }
      },

      /*
       * Retrieve a CC token from Stripe
       */
      createStripeToken: function(event) {
        event.preventDefault();
        if ( this.verifyInput() ) {
          this.parseExpiration();
          this.$("#submit-donation").prop('disabled', true);
          Stripe.card.createToken(this.form(), (this.stripeResponseHandler).bind(this));
        }

        //Prevent form from submitting
        return false; 
      },

      //reset form fields
      resetForm: function() {
        this.form()[0].reset();
        $("#submit-donation").prop('disabled', false);
      },

      render: function() {
        console.log("Rendering the donationform template");
        var src = $("#donation-form-template").html();
        var template = Handlebars.compile(src);
        var html = template();
        this.$el.html(html);      
        
        //set the element of the message box
        this.messageView.$el = $("#message-box");

        //set the navbar settings
        App.navbar.set({login: true, logout: false});
      }
    });

  });
}).call(this);
