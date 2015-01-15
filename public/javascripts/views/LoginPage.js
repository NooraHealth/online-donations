
(function(){
  $(document).ready(function() {
    
    window.LoginPage = Backbone.View.extend({
      el: "#body",
      events: {
        "click .donation-form": "navigateToDonationForm",
        "submit": "validateInput"
      },
      
      /*
       * Validate login form input before submitting,
       * post error message to user if not valid
       */
      submit: function(e) {
        console.log("This is where I validate input");  
        var password = this.$el.$("#password");
        var email = this.$el.$("#email");

        if ( password.val() == "" ) {
          App.message.set({error: "Please enter your password"});
          //prevent the form from submitting
          return false;
        }

        if ( email.val() == "" ) {
          App.message.set({error: "Please enter your email address"});
          //prevent the form from submitting
          return false;
        }
        
        //Submit the form to authenticate the credentials
        return true;

      },

      navigateToDonationForm: function() {
        App.Router.navigate("donations", {trigger: true});
      },

      render: function() {
        var src = $("#login-template").html();
        var template = Handlebars.compile(src);
        var html = template();
        this.$el.html(html);      
      }
    });
  });
}).call(this);
