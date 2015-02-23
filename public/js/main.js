require.config({
  paths: {
    main: 'main-built',
    jquery: 'libs/jquery/jquery',
    Stripe: "https://js.stripe.com/v2/?1",
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    handlebars: 'libs/handlebars/handlebars',
    stripe: 'libs/stripe/stripe',
    router: 'Router', 
    bootstrap: 'libs/bootstrap/bootstrap',
    moment: 'libs/moment/moment',
    hbs: 'libs/require-handlebars-plugin/hbs'
  },
  
  hbs: {
    helpers: true,
    partialsUrl: 'templates/partials/'
  },

  shim: {
     stripe:  {
        exports: "Stripe",
     },

      underscore: {
          exports: "_"
      },
      backbone: {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
      },
      bootstrap: {
        deps: ['jquery'],
      }
    }
});

require([
  "stripe",
  // Load our app module and pass it to our definition function
  'App',
], function(Stripe, App){
  Stripe.setPublishableKey('pk_test_wgnlG9SWZYbwIHTseFsrN7sA');
  //Stripe.setPublishableKey('pk_live_UfNNEjCQdIbLsrVImH1uCUnP');
  console.log("In main.js -- about to initialize the app");
  // The "app" dependency is passed in as "App"
  App.initialize();
});


