define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'stripe',   
  'hbs!templates/changeEmailModal',
  'views/MessageView',
  'models/Message',
  'views/Bases/FormBase',
  'bootstrap'
], function($, _, Backbone, Handlebars, Stripe, changeEmailFormTemplate, MessageView, Message, FormBase){

    var ChangeEmailView = FormBase.extend({
    
      el: "#modal",
      
      initialize: function(options) {
        this.donor = options.donor;
      },
      
      modal: function() {
        return $("#change-email-modal");
      },

      submitChangeEmail: function() {
        return $("#submit-change-email");
      },  

      changeEmailForm: function() {
        return $("#change-email-form");
      },

      events: {
        "click #submit-change-email": "postChangeEmail",
      },

      postChangeEmail: function(e) {
        e.preventDefault();

        if (this.$("input[name=currentpassword]").val() == "" ) {
          this.message.clear();
          this.message.set({error: "Please enter your current password."});
          return false;
        }
          
        data = {
          newemail: $("input[name=newemail]").val(),
          password: $("input[name=password]").val(),
        };
        
        this.$("#submit-change-email").prop('disabled', true);
        
        $.post('donors/changeemail', data, function() {
          console.log("posting successful");
        })
          .done(this.handleResponse.bind(this))
          .fail(this.handleServerError.bind(this))
      },


      handleResponse: function(response) {
        if ( response.error ) {
          this.handleServerError(response.error);
        } else {
          this.donor.set("email",  response.donor.email);
          this.showSuccessMessage();
        }
      },

      showSuccessMessage: function() {
        this.message.clear();
        this.changeEmailForm().hide();
        this.submitChangeEmail().hide();
        this.successMessage().show(); 
      },

      resetForm: function(){
        $('#change-email-form')[0].reset();
        this.$("#submit-change-email").prop('disabled', false);
      },

      render: function() {
        var html = changeEmailFormTemplate({email: this.donor.get('email'), successMessage: "Your email has been changed successfully!"});
        this.$el.html(html);      

        this.successMessage().hide();

        //Set the el of the form message view now that the form has been rendered
        //this.messageView.setElement($("#form-messages"));
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#change-email-message")}); 
        this.messageView.render();
        return this;
      }
    });

    return ChangeEmailView;
  });
