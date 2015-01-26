
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/timestampToString', ['hbs/handlebars', 'moment'], function ( Handlebars, Moment ) {

  function timestampToString ( timestamp, options ) {
    return moment.unix(timestamp).format("MMMM do, YYYY");
  }

  Handlebars.registerHelper( 'timestampToString', timestampToString );
  return timestampToString;
});
