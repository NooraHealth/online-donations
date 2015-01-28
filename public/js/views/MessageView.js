define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'models/Message'
], function($, _, Backbone,Handlebars, Message){
    var MessageView = Backbone.View.extend({
      template: "<div>{{message}}{{success}}{{error}}{{warning}}</div>",

      initialize: function(options) {
        this.model = options.model;
        this.listenTo(this.model, 'change', this.render);
      },

      render: function() {
        var template = Handlebars.compile(this.template);
        var html = template(this.model.toJSON());
        this.$el.html(html);      
        return this;
      }
    });
    return MessageView;
  });
