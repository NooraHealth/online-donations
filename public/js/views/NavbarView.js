define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',// lib/backbone/backbone
  'handlebars',
  'hbs!templates/nav',
  'models/Donor'
], function($, _, Backbone, Handlebars, navTemplate, Donor ){
    var NavbarView = Backbone.View.extend({

      el: "#nav" ,

      loginBtn: function() {
        return this.$el.find('.login');
      },
      
      logoutBtn: function() {
        return this.$el.find('.logout');
      },

      gotoConsole: function() {
        return this.$el.find('.gotoConsole');
      },
    
      initialize: function(options) {
        this.model = Donor;
        //Using this form of declaration to 
        //resolve circular dependancy issue
        this.router = options.router;
      },

      events: {
       "click .login": "navigateToLogin",
       "click .logout": "logoutDonor",
       "click .gotoConsole": "gotoDonorConsole"
      },

      gotoDonorConsole: function() {
        this.router.navigate("donorConsole", {trigger: true});
      },

       navigateToLogin: function() {
        this.router.navigate("login", {trigger: true});
       },
       
       logoutDonor: function() {
         $.post('/logout');
         //clear the donor so the navbar will know the user has logged out
         //--removing their data from the client
         Donor.clear();
         this.router.navigate("donationForm");
       },
       
       render: function() {
          var html = navTemplate(this.model.toJSON());
          this.$el.html(html);      
       },

    });
    return NavbarView;
  });

