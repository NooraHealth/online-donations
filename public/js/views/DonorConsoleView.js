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
  'views/ChangePasswordFormView',
  'bootstrap'
], function($, _, Backbone, Handlebars, donorConsoleTemplate, 
           MessageView, Message, Donor, EditMembershipFormView, ChangePasswordFormView){
    var DonorConsole = Backbone.View.extend({
      
      el: "#body",
      
      initialize: function() {
        this.model = Donor;
      },

      events: {
        "click #edit-membership": "showEditMembershipModal", 
        "click #change-password": "showChangePasswordModal",
        "click #make-another-donation": "showMakeADonationModal"
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      //showMakeADonationModal: function() {
        //var makeANewDonationModal = new ChangePasswordFormView();
        //changePasswordModal.render();
        //changePasswordModal.show();
      //},
      
      /**
       * Display the modal that will allow donors to change their password
       */
      showChangePasswordModal: function() {
        var changePasswordModal = new ChangePasswordFormView();
        changePasswordModal.render();
        changePasswordModal.show();
      },

      /**
       * Display the modal that will allow donors to edit their membership
       */
      showEditMembershipModal: function() {
        var editMembershipModal = new EditMembershipFormView({router: this.router, model: Donor.get("subscriptions").data[0].plan});
        
        editMembershipModal.render();
        editMembershipModal.show();
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
