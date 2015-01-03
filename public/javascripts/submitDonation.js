(function($) {
  $('#payment-form').submit(function(e) {
    var form = $(this);
    $form.find('button').prop('disabled', true);
    
    Stripe.card.createToken($form, stripeResponseHandler);
    
    //prevent form from submitting with default action
    return false;
  });

  function stripeResponseHandler(status, response){
    var form = $('#payment-form');
    
    if(response.error) {
      $('.payment-errors').text(response.error.message);      
      $form.find('button').prop('disabled',false);
    } else{
      var token = response.id;
      //insert the token into the form for submission
      $form.append("input type='hidden' name='stripeToken'/> ").val(token);
      $form.get(0).submit();
    }
  }
});
