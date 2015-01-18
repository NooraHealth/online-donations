(function(){
  $(document).ready(function() {
    window.NavbarView = Backbone.View.extend({

      el: "#noora-nav" ,

      loginBtn: function() {
        return this.$el.find('.login');
      },
      
      logoutBtn: function() {
        return this.$el.find('.logout');
      },

      logoutBtn: function() {
        return this.$el.find('.goToConsole');
      },
    
      initialize: function() {
        this.listenTo(this.model, 'change:login', this.render);
        this.listenTo(this.model, 'change:logout', this.render);
      },

      events: {
       "click .login": "navigateToLogin",
       "click .logout": "logoutDonor",
       "click .goToConsole": "gotoDonorConsole"
      },

      gotoDonorConsole: function() {
        App.Router.navigate("login", {trigger: true});
      },

       navigateToLogin: function() {
          console.log("Navigating to the login");
          App.Router.navigate("login", {trigger: true});
       },
       
       logoutDonor: function() {
         $.post('/logout');
         App.donor.clear();
         App.donor.set({loggedOut: true});
         App.Router.navigate("DonationForm");
       },
       
       render: function() {
         console.log("This is the navbar model:");
         console.log(this.model.attributes.login);
         this.clear();
          if (this.model.attributes.login) {
            this.loginBtn().show();
          }  else if (this.model.attributes.logout) {
            this.logoutBtn().show();
            this.gotoConsole().show();
          }
       },

       clear: function() {
         console.log("Clearing the btns");
         this.logoutBtn().hide();
         this.loginBtn().hide();
         this.gotoConsole().hide();
       }
    
    });
  });
}).call(this);

