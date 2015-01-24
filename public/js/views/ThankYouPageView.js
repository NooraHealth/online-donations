
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'hbs!templates/thankYouPage',
], function($, _, Backbone, Handlebars, thankYouPageTemplate){
    var ThankYouPageView = Backbone.View.extend({

      el: "#body" ,
      
      render: function() {
        var html = thankYouPageTemplate(this.model.toJSON());
        this.$el.html(html);      
        return this;
      },
    });
    return ThankYouPageView;
  });

