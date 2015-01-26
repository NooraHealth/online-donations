
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/donatesMonthly', ['hbs/handlebars'], function ( Handlebars ) {

  function donatesMonthly ( donor, options ) {
    console.log(this);
    if (!donor.subscriptions)
      return;
    
    if(donor.subscriptions.total_count == 0)
      return;
    
    var id = donor.subscriptions.data[0].plan.id;
    console.log(id);
    // The place where the '.' will go
    if ( id != "onetime" )
      return options.fn(this.subscriptions.data[0].plan);
  }

  Handlebars.registerHelper( 'donatesMonthly', donatesMonthly );
  return donatesMonthly;
});
