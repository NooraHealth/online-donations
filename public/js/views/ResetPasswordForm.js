
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'views/Bases/FormBase',
  'hbs!templates/resetPasswordForm',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, FormBase, resetPasswordTemplate, Message, MessageView ){
    
    var Reset = FormBase.extend({
      el: "#body",

      form: function() {
        return $('#reset-password-form');
      },
      
      successMessage: function() {
        return $('#success');
      },

      initialize: function(options) {
        this.token = options.token;
      },

      events: {
        "submit #reset-password-form": "resetPassword"
      },
      
      resetPassword:  function(e) {
        e.preventDefault();

        data = {
          password: $("input[name=email]").val(),
        };
        
        this.$("#submit-reset-password").prop('disabled', true);
        
        $.post('/forgot/'+ this.token, data, function() {
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
        this.$("#submit-reset-password").prop('disabled', false);
      },

      render: function() {
        var html = resetPasswordTemplate({token: this.token});
        this.$el.html(html);      
       
        this.successMessage().hide();

        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#reset-password-message")}); 
        this.messageView.render();
      }
    });

    return Reset;
  });
