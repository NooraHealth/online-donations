define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'views/Bases/FormBase',
  'hbs!templates/forgotPassword',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, FormBase, forgotPasswordTemplate, Message, MessageView ){
    
    var ForgotPassword = FormBase.extend({
      el: "#body",

      form: function() {
        return $('#forgot-password-form');
      },
      
      successMessage: function() {
        return $('#success');
      },

      events: {
        "submit #forgot-password-form": "requestResetToken"
      },
      
      requestResetToken:  function(e) {
        e.preventDefault();

        console.log("requesting!");
        data = {
          email: $("input[name=email]").val(),
        };
        
        this.$("#submit-forgot-password").prop('disabled', true);
        
        $.post('/donors/changepassword', data, function() {
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
        this.form().hide();
        this.successMessage().show(); 
      },
      
      resetForm: function(){
        this.form()[0].reset();
        this.$("#submit-forgot-password").prop('disabled', false);
      },

      render: function() {
        var html = forgotPasswordTemplate();
        this.$el.html(html);      
       
        this.successMessage().hide();

        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#forgot-password-message")}); 
        this.messageView.render();
      }
    });

    return ForgotPassword;
  });
