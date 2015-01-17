
(function(){
  $(document).ready(function() {
    
    window.LoginPage = Backbone.View.extend({
      el: "#body",
      events: {
        "click .donation-form": "navigateToDonationForm",
        "submit #login-form": "submit"
      },
      
      /*
       * Validate login form input before submitting,
       * post error message to user if not valid
       */
      submit: function(e) {
        //e.preventDefault();
        console.log("This is where I validate input");  
        var password = this.$el.find("#password");
        var email = this.$el.find("#email");

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

        credentials = {
          email: this.$el.find("#email").val(),
          password: this.$el.find("#password").val(),
        };

        $.post('/login', credentials, function() {
          console.log("post successful"); 
        }).done(function(response) {
          console.log("recieved response");
          console.log(response);
          if (response.error)
            App.message.set({error: response.error});
          if (response.donor) {
            App.donor.set( response.donor );
            App.Router.navigate("donors", {trigger: true});
          } else {
            App.message.set({error: "There was an error logging in. Please try again."});
          }
        }).fail(function(err) {
          App.message.set({error: err});
        });
        
        //Submit the form to authenticate the credentials
        return false;

      },

      navigateToDonationForm: function() {
        App.Router.navigate("donations", {trigger: true});
      },

      render: function() {
        var src = $("#login-template").html();
        var template = Handlebars.compile(src);
        var html = template();
        this.$el.html(html);      

        //set the element of the message box
        this.messageView.$el = $("#message-box");

        //set the navbar settings
        App.navbar.set({login: false, logout: false});
      }
    });
  });
}).call(this);
