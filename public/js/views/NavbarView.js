define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',// lib/backbone/backbone
  'handlebars',
  'hbs!templates/nav',
  'views/LoginPageView',
  'models/Nav'
], function($, _, Backbone, Handlebars, navTemplate, LoginPageView){
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
        this.donor = options.donor;
        this.listenTo(this.model, 'change', this.render);
        
        //Using this form of declaration to 
        //resolve circular dependancy issue
        this.router = options.router;
      },

      onClose: function() {
        //reintroduce the removed root element to the DOM for use later
        this.model.unbind('change', this.render);
      },

      events: {
       "click .login": "showLoginModal",
       "click .logout": "logoutDonor",
       "click .gotoConsole": "gotoDonorConsole"
      },

      gotoDonorConsole: function() {
        this.router.navigate("nooradonors", {trigger: true});
      },

       showLoginModal: function() {
         if (!this.loginModal) {
          var login = new LoginPageView({router: this.router, donor: this.donor});
          this.loginModal = login
          login.render();
         }
         this.loginModal.show();
       },
       
       logoutDonor: function(e){
          e.preventDefault();
          
          this.donor.clear();

          $.post('/logout');

          this.router.navigate('giving', {trigger: true}); 
        
         //clear the donor so the navbar will know the user has logged out
         //--removing their data from the client
        return false;
       },
       
       render: function() {
          var html = navTemplate(this.model.toJSON());
          this.$el.html(html);      
       },

    });
    return NavbarView;
  });

