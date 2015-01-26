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

        //$.post('donors/changepassword', data, function() {
          //console.log("posting successful");
        //});
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
