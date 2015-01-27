define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',  // lib/backbone/backbone
  'handlebars',
  'hbs!templates/donorConsole',
  'views/MessageView',
  'models/Message',
  'models/Donor',
  'views/EditMembershipFormView',
  'bootstrap'
], function($, _, Backbone, Handlebars, donorConsoleTemplate, 
           MessageView, Message, Donor, EditMembershipFormView){
    var DonorConsole = Backbone.View.extend({
      
      el: "#body",
      
      initialize: function() {
        this.model = Donor;
      },

      events: {
        "click #edit-membership": "showEditMembershipModal", 
        "submit #change-password-form": "verifyChangePasswordInputs"
      },

      verifyChangePasswordInputs: function(e) {
        e.preventDefault();
        console.log("Verifying the changepassword input fields");

        if (this.$("input[name=currentpassword]").val() == "" ) {
          this.message.set({error: "Please enter your current password."});
          return false;
        }

        if (this.$("input[name=password]").val() == "" ) {
          this.message.set({error: "Please enter a new password."});
          return false;
        }
        
        if (this.$("input[name=password]").val() != this.$("input[name=confirm]").val()) {
          this.message.set({error: "Your passwords do not match"});
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
          .fail(this.handleError.bind(this))
      },
      
      handleError: function() {
        this.message.set({error: "There was an error completing your request. Please try again."});
        this.resetChangePasswordForm();   
      },

      handleResponse: function(response) {
        if ( response.error ) {
          this.message.set({error: response.error});
          this.resetChangePasswordForm();  
        } 
        if ( response.donor ) {
          this.message.set({success: response.success});
        }
      },

      resetChangePasswordForm: function(){
       $('#change-password-form')[0].reset();
       this.$("#submit-change-password").prop('disabled', false);
      },


      showEditMembershipModal: function() {
        if (!this.editMembershipModal) {
          var editMembershipModal = new EditMembershipFormView({router: this.router, model: Donor.get("subscriptions").data[0].plan});
          this.editMembershipModal = editMembershipModal;
          editMembershipModal.render();
        }
        
        this.editMembershipModal.show();
      },

      render: function() {
        var html = donorConsoleTemplate(this.model.toJSON());
        this.$el.html(html);      
        
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#console-message")}); 
        this.messageView.render();
        
        return this;
      },
      
    });
    
    return DonorConsole;
  });
