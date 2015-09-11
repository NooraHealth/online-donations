define('templates/helpers/smallScreen', ['hbs/handlebars'], function ( Handlebars) {
  
  function smallScreen ( donor , options) {
    console.log("window available width: " + window.innerWidth);
    return (window.innerWidth < 768) ? options.fn() : options.inverse();
  }

  Handlebars.registerHelper( 'smallScreen', smallScreen );
  return smallScreen;
});
