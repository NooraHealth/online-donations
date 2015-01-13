(function(){
  $(document).ready(function() {
    window.DonationForm = Backbone.View.extend({
      //tagName: "form",
      el: "#donation-form",
      id: "donation-form",
      element: this.$el,

      events: {
        "submit": "createStripeToken",
      },
      
      parseExpiration: function() {
        console.log("parsing the expiration");
        var exp = $("#expiration").val();
        if (exp.length < 7)
          return;

        var month = exp.substring(0,2);
        var year = exp.substring(3);
        
        $("#expyear").val(year);
        $("#expmonth").val(month);
      },

      verifyInput: function() {
        console.log("Verifying the form input");
        if (this.$("input[name=password]").val() != this.$("input[name=confirm]").val()) {
          console.log("changing error message");
          DonationPageView.message.set({error: "Your passwords do not match"});
          console.log(DonationPageView.message);
          return false;
        }
          
        return true;
      },
      
      stripeResponseHandler: function(status, response){
        console.log("Recieved a response from the Stripe servers.");
        if(response.error) {
          //$('#message-box').text(response.error.message);      
          DonationPageView.message.set({error: response.error.message});
          this.$('#submit-donation').prop('disabled',false);
        } else{
          var token = response.id;
          
          var form = this.$el
          var data = {
            stripeToken: token,
            name: $("input[name=name]").val(),
            password: $("input[name=password]").val(),
            email: $("input[name=email]").val(),
            amount: $("input[name=amount]").val() * 100,
            monthly: $("input[name=monthly").is(':checked') 
          }
          var promise = $.post ("/donations/submit", data, function() {
            console.log("Posting the donation");
          }).done( function ( response ) {
            if ( response.error ) {
              DonationPageView.message.set({error: response.error});
            } 
            if (response.success) {
              DonationPageView.message.set({success: response.success});
            }
            form[0].reset();
            $("#submit-donation").prop('disabled', false);
          }).fail( function() {
            DonationPageView.message.set({error: "There was an error processing your donation. Please try again"});
            form[0].reset();
            $("#submit-donation").prop('disabled', false);
          });
        }
      },

      createStripeToken: function(event) {
        event.preventDefault();
        if ( this.verifyInput() ) {
          this.parseExpiration();
          console.log("Creating a stripe token");
          this.$("#submit-donation").prop('disabled', true);
          Stripe.card.createToken(this.$el, (this.stripeResponseHandler).bind(this));
        }
        return false; 
      }
    });

  });
}).call(this);
