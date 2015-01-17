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
    
      initialize: function() {
        this.listenTo(this.model, 'change:login', this.render);
        this.listenTo(this.model, 'change:logout', this.render);
      },

      events: {
       "click .login": "navigateToLogin",
       "click .logout": "logoutDonor"
      },

       navigateToLogin: function() {
          console.log("Navigating to the login");
          App.Router.navigate("login", {trigger: true});
       },
       
       logoutDonor: function() {
         //logout stub
         //Which page do we want the app to navigate to upon logout?
         //$.post('/logout');
         //App.router.navigate("DonationForm");
       },
       
       render: function() {
         console.log("This is the navbar model:");
         console.log(this.model.attributes.login);
         this.clear();
          if (this.model.attributes.login) {
            this.loginBtn().show();
          }  else if (this.model.attributes.logout) {
            this.logoutBtn().show();
          }
       },

       clear: function() {
         console.log("Clearing the btns");
         this.logoutBtn().hide();
         this.loginBtn().hide();
       }
    
    });
  });
}).call(this);

