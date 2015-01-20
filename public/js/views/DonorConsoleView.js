define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',  // lib/backbone/backbone
  'handlebars',
  'text!templates/donorConsole.hbs',
  'views/MessageView',
  'models/Donor',
  'bootstrap'
], function($, _, Backbone, Handlebars, donorConsoleTemplate, 
           MessageView, Donor){
    var DonorConsole = Backbone.View.extend({
      
      el: "#body",

      initialize: function() {
        this.model = Donor;
      },

      render: function() {
        var template = Handlebars.compile(donorConsoleTemplate);
        var html = template(this.model.toJSON());
        this.$el.html(html);      
        
        return this;
      },
      
    });
    
    return DonorConsole;
  });
