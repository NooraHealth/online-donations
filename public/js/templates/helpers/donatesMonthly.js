
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/donatesMonthly', ['hbs/handlebars'], function ( Handlebars ) {

  function donatesMonthly ( donor, options ) {
    console.log("Thi is sht edonor in donatesMonthly");
    // The place where the '.' will go
    if (donor == "testing")
      return options.fn(this);
  }

  Handlebars.registerHelper( 'donatesMonthly', donatesMonthly );
  return donatesMonthly;
});
