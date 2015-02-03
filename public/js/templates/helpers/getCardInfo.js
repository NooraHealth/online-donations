

/**
Returns whether the donor donates monthly. If the donor is a one-time donor, 
the function returns false
**/
define('templates/helpers/getCardInfo', ['hbs/handlebars'], function ( Handlebars ) {

  function cardInfo ( donor, options ) {
    
    if (!donor.cards)
      return "";

    if (donor.cards.total_count == 0)
      return "";

    var card =  donor.cards.data[0];
    return card.brand + " " + "**** **** **** " + card.last4;
    
  }

  Handlebars.registerHelper( 'getCardInfo', cardInfo );
  return cardInfo;
});
