define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',// lib/backbone/backbone
  'handlebars',
  'text!templates/nav.hbs',
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
        this.router = options.router
        this.listenTo(this.model, 'change:login', this.render);
        this.listenTo(this.model, 'change:logout', this.render);
      },

      events: {
       "click .login": "navigateToLogin",
       "click .logout": "logoutDonor",
       "click .gotoConsole": "gotoDonorConsole"
      },

      gotoDonorConsole: function() {
        this.router.navigate("donors", {trigger: true});
      },

       navigateToLogin: function() {
          this.router.navigate("login", {trigger: true});
       },
       
       logoutDonor: function() {
         $.post('/logout');
         Donor.clear();
         Donor.set({loggedOut: true});
         this.router.navigate("DonationForm");
       },
       
       render: function() {
          var template = Handlebars.compile(navTemplate);
          var html = template(this.model.toJSON());
          this.$el.html(html);      
       },

       clear: function() {
         console.log("Clearing the btns");
         this.logoutBtn().hide();
         this.loginBtn().hide();
         this.gotoConsole().hide();
       }
    
    });
    return NavbarView;
  });

