
/**
Returns whether the donor donates monthly. If the donor is a one-time donor, 
the function returns false
**/
define('templates/helpers/donatesMonthly', ['hbs/handlebars'], function ( Handlebars ) {

  function donatesMonthly ( donor, options ) {
    if (!donor.subscriptions)
      return false;
    
    if(donor.subscriptions.total_count == 0)
      return false;
    
    var id = donor.subscriptions.data[0].plan.id;
    // The place where the '.' will go
    if ( id != "onetime" )
      return options.fn(this.subscriptions.data[0].plan);

  }

  Handlebars.registerHelper( 'donatesMonthly', donatesMonthly );
  return donatesMonthly;
});
