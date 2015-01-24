
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
        console.log("THis model: ", this.model);
        var html = thankYouPageTemplate(this.model);
        this.$el.html(html);      
        return this;
      },
    });
    return ThankYouPageView;
  });

