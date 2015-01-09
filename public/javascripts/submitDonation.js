(function(){
  $(document).ready(function() {
  
    function parseForExpiration() {

      var exp = $("#expiration").val();
      if (exp.length < 7)
        return;

      var month = exp.substring(0,2);
      var year = exp.substring(3);
      
      $("#expyear").val(year);
      $("#expmonth").val(month);
    } 

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

    function createStripeToken (event) {
      event.preventDefault();
      parseForExpiration();
      console.log("Creating a stripe token");
      var form = $(this);
      form.find('button').prop('disabled', true);
      Stripe.card.createToken(form, stripeResponseHandler);
      return false; 
    }

    $('#payment-form').on('submit', createStripeToken);

  })
}).call(this);
