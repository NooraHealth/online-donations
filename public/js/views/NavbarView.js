define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',// lib/backbone/backbone
  'handlebars',
  'hbs!templates/nav',
  'views/LoginPageView',
  'models/Donor',
  'models/Nav',
], function($, _, Backbone, Handlebars, navTemplate, LoginPageView, Donor, Nav ){
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
        this.model = Nav;
        this.listenTo(this.model, 'change', this.render);
        
        //Using this form of declaration to 
        //resolve circular dependancy issue
        this.router = options.router;
      },

      events: {
       "click .login": "showLoginModal",
       "click .logout": "logoutDonor",
       "click .gotoConsole": "gotoDonorConsole"
      },

      gotoDonorConsole: function() {
        this.router.navigate("donorConsole", {trigger: true});
      },

       showLoginModal: function() {
         if (!this.loginModal) {
          var login = new LoginPageView({router: this.router});
          this.loginModal = login
          login.render();
         }
         this.loginModal.show();
       },
       
       logoutDonor: function(e){
          e.preventDefault();
          
          Donor.clear();
          this.router.navigate('giving', {trigger: true}); 

          $.post('/logout', function() {
            console.log("Logged out!");
          });
        
         //clear the donor so the navbar will know the user has logged out
         //--removing their data from the client
       },
       
       render: function() {
          var html = navTemplate(this.model.toJSON());
          this.$el.html(html);      
       },

    });
    return NavbarView;
  });

