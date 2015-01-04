(function(){
  $(document).ready(function() {
  
    function stripeResponseHandler(status, response){
      console.log("Recieved a response from stripe: ");
      console.log(status);
      console.log(response);
      var form = $('#payment-form');
      
      if(response.error) {
        $('.payment-errors').text(response.error.message);      
        form.find('button').prop('disabled',false);
      } else{
        var token = response.id;
        //insert the token into the form for submission
        form.append("<input type='hidden' name='stripeToken' value="+token+"/>" );
        form.get(0).submit();
      }
    }

    $('#payment-form').on('submit', function(e) {
      e.preventDefault();
      var form = $(this);
      form.find('button').prop('disabled', true);
      console.log("Getting a token from Stripe"); 
      Stripe.card.createToken(form, stripeResponseHandler);
      return false; 
    });

  })
}).call(this);
