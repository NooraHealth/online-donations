define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',  // lib/backbone/backbone
  'handlebars',
  'hbs!templates/donorConsole',
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
        var html = donorConsoleTemplate(this.model.toJSON());
        this.$el.html(html);      
        
        return this;
      },
      
    });
    
    return DonorConsole;
  });
