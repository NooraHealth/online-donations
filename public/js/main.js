require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    handlebars: 'libs/handlebars/handlebars',
    stripe: 'libs/stripe/stripe',
    router: 'Router', 
    bootstrap: 'libs/bootstrap/bootstrap',
    hbs: 'libs/require-handlebars-plugin/hbs'
  },
  
  hbs: {
    helpers: true,
    partialsUrl: 'templates/partials/'
  },

  shim: {
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

  // Load our app module and pass it to our definition function
  'App',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
