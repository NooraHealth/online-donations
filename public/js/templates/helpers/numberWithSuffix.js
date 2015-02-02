

/**
Returns a number with the appropiate suffix -- eg 2->2nd, 3->3rd, 45->45th....
**/
define('templates/helpers/numberWithSuffix', ['hbs/handlebars'], function ( Handlebars ) {

  function addSuffix ( number, options ) {
    if (typeof(number) != "number" && !parseInt(number))
      return number;
    
    if ( typeof(number) != "string"){
       number = number.toString();
    }

    var lastDigit = number.charAt(number.length -1); 

    if ( lastDigit == "2" )
      return number + "nd";

    else if (lastDigit == "3")
      return number + "rd";

    else
      return number + "th";

  }

  Handlebars.registerHelper( 'numberWithSuffix', addSuffix );
  return addSuffix;
});
