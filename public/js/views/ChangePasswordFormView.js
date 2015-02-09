
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/changePasswordModal',
  'views/MessageView',
  'models/Message',
  'views/FormBase',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, changePasswordFormTemplate, MessageView, Message, FormBase){

    var ChangePasswordFormView = FormBase.extend({
    
      el: "#modal",
      
      initialize: function(options) {
      },
      
      modal: function() {
        return $("#change-password-modal");
      },

      submitChangePassword: function() {
        return $("#submit-change-password");
      },  

      changePasswordForm: function() {
        return $("#change-password-form");
      },

      events: {
        "click #submit-change-password": "verifyChangePasswordInputs",
      },

      verifyChangePasswordInputs: function(e) {
        e.preventDefault();

        if (this.$("input[name=currentpassword]").val() == "" ) {
          this.message.clear();
          this.message.set({error: "Please enter your current password."});
          return false;
        }
        
        if (this.$("input[name=password]").val() == "" ) {
          this.message.clear();
          this.message.set({error: "Please enter a new password."});
          return false;
        }
        
        if (this.$("input[name=password]").val() != this.$("input[name=confirm]").val()) {
          this.message.clear();
          this.message.set({error: "Your passwords do not match"});
          return false;
        }

        if (this.$("input[name=password]").val().length < 6 ) {
          this.message.clear();
          this.message.set({error: "Your new password should be at least 6 characters long."});
          return false;
        }
          
        data = {
          currentpassword: $("input[name=currentpassword]").val(),
          password: $("input[name=password]").val(),
        };
        
        this.$("#submit-change-password").prop('disabled', true);
        
        $.post('donors/changepassword', data, function() {
          console.log("posting successful");
        })
          .done(this.handleResponse.bind(this))
          .fail(this.handleServerError.bind(this))
      },


      handleResponse: function(response) {
        if ( response.error ) {
          this.handleServerError(response.error);
        } else {
          this.showSuccessMessage();
        }
      },

      showSuccessMessage: function() {
        this.message.clear();
        this.changePasswordForm().hide();
        this.submitChangePassword().hide();
        this.successMessage().show(); 
      },

      resetForm: function(){
        $('#change-password-form')[0].reset();
        this.$("#submit-change-password").prop('disabled', false);
      },

      render: function() {
        var html = changePasswordFormTemplate({successMessage: "Your password has been changed successfully!"});
        this.$el.html(html);      

        this.successMessage().hide();

        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#change-password-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return ChangePasswordFormView;
  });
