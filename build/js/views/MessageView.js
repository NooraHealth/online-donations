define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',
  'models/Message',
  'hbs!templates/message',
  'bootstrap'
], function($, _, Backbone,Handlebars, Message, messageTemplate){
    var MessageView = Backbone.View.extend({

      initialize: function(options) {
        this.model = options.model;
        this.listenTo(this.model, 'change', this.render);
      },

      render: function() {
        var html = messageTemplate(this.model.toJSON());
        this.$el.html(html);      
        return this;
      }
    });
    return MessageView;
  });
