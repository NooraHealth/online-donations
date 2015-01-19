
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'text!templates/thankYouPage.hbs',
], function($, _, Backbone, Handlebars, thankYouPageTemplate){
    var ThankYouPageView = Backbone.View.extend({

      el: "#body" ,
      
      render: function() {
        var template = Handlebars.compile(thankYouPageTemplate);
        var html = template(this.model);
        this.$el.html(html);      
        return this;
      },
    });
    return new ThankYouPageView();
  });

