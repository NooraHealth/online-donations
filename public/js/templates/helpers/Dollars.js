
/**
Transforms a whole cent value into it's string equivalent in dollars.
For example: 4200 - > $42.00
**/
define('templates/helpers/Dollars', ['hbs/handlebars'], function ( Handlebars ) {

  function dollars ( amount, options ) {
    // The place where the '.' will go
    var str = amount.toString(); 
    var position = str.length - 2;
    console.log("str");
    console.log(position);
    return ["$", str.slice(0, position), '.', str.slice(position)].join('');

  }

  Handlebars.registerHelper( 'Dollars', dollars );
  return dollars;
});
