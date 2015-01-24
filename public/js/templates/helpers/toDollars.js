
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/toDollars', ['hbs/handlebars'], function ( Handlebars ) {

  function dollars ( amount, options ) {
    // The place where the '.' will go
    var str = amount.toString(); 
    var position = str.length - 2;
    return ["$", str.slice(0, position), '.', str.slice(position)].join('');

  }

  Handlebars.registerHelper( 'toDollars', dollars );
  return dollars;
});
