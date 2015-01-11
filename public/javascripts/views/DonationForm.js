(function(){
  $(document).ready(function() {
    var DonationForm = Backbone.View.extend({
      //tagName: "form",
      el: "#donation-form",
      id: "donation-form",
      element: this.$el,

      events: {
        "submit": "createStripeToken",
      
        //"click #submit-donation": "createStripeToken"
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
      
      stripeResponseHandler: function(status, response){
        console.log("Recieved a response from the Stripe servers.");
        if(response.error) {
          $('.payment-errors').text(response.error.message);      
          this.$('#submit-donation').prop('disabled',false);
        } else{
          var token = response.id;
          //insert the token into the form for submission
          this.$el.append("<input type='hidden' name='stripeToken' value='"+token+"' />" );
          this.$el.get(0).submit();
        }
      },

      createStripeToken: function(event) {
        event.preventDefault();
        this.parseExpiration();
        console.log("Creating a stripe token");
        this.$("#submit-donation").prop('disabled', true);
        Stripe.card.createToken(this.$el, (this.stripeResponseHandler).bind(this));
        return false; 
      }
    });

    var DonationForm = new DonationForm;
    console.log(DonationForm);
  });
}).call(this);
