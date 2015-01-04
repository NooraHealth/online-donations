(function(){
  $(document).ready(function() {
  
    function stripeResponseHandler(status, response){
      var form = $('#payment-form');
      
      if(response.error) {
        $('.payment-errors').text(response.error.message);      
        form.find('button').prop('disabled',false);
      } else{
        var token = response.id;
        //insert the token into the form for submission
        form.append("<input type='hidden' name='stripeToken' value='"+token+"' />" );
        form.get(0).submit();
      }
    }

    $('#payment-form').on('submit', function(e) {
      e.preventDefault();
      var form = $(this);
      form.find('button').prop('disabled', true);
      Stripe.card.createToken(form, stripeResponseHandler);
      return false; 
    });

    $('#donation-options').on('click', function(e) {
      console.log("An option was selected");
      console.log($(this));
    });
  })
}).call(this);
