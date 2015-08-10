
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'hbs!templates/thankYouPage',
], function($, _, Backbone, Handlebars, thankYouPageTemplate){
    var ThankYouPageView = Backbone.View.extend({

      el: "#body",
      
      render: function() {
        console.log("thank you form this is ");
        console.log(this);
        console.log("rendering thank you page");
        var html = thankYouPageTemplate(this.model.toJSON());
        console.log("html for thank you page");
        console.log(html);
        console.log("this.el before render thank you");
        console.log(this.$el);
        console.log("this.el.html before render thank you");
        console.log(this.$el.html());
        this.$el.html(html);
        console.log("this.el before after thank you");
        console.log(this.$el);
        console.log("after this.el.html is rendered");
        console.log(this.$el.html());
        return this;
      }
    });
    return ThankYouPageView;
  });

