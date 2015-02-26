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
  Stripe.setPublishableKey($("#STRIPE_PUBLIC_KEY").val());
  // The "app" dependency is passed in as "App"
  App.initialize();
});


