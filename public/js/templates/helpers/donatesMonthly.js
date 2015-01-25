
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/donatesMonthly', ['hbs/handlebars'], function ( Handlebars ) {

  function donatesMonthly ( donor, options ) {
    // The place where the '.' will go
    return true;
  }

  Handlebars.registerHelper( 'donatesMonthly', donatesMonthly );
  return donatesMonthly;
});
