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
  'views/GiveAgainView',
  'views/ConfirmCancelView',
  'bootstrap'
], function($, _, Backbone, Handlebars, donorConsoleTemplate, 
           MessageView, Message, Donor, EditMembershipFormView, ChangePasswordFormView, GiveAgainView, ConfirmCancelView){
    var DonorConsole = Backbone.View.extend({
      
      el: "#body",
      
      initialize: function() {
        this.model = Donor;

        //Rerender the Donor console whenever there is a change to the donor object
        this.listenTo(this.model, 'change', this.render);
      },

      events: {
        "click #edit-membership": "showEditMembershipModal", 
        "click #change-password": "showChangePasswordModal",
        "click #give-again": "showGiveAgainModal",
        "click #cancel-membership": "showCancelMembershipModal",
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      showGiveAgainModal: function() {
        if(!this.giveAgainModal)
          this.giveAgainModal = new GiveAgainView();
        this.giveAgainModal.render();
        this.giveAgainModal.show();
      },
      
      /**
       * Display the modal that will allow donors to change their password
       */
      showCancelMembershipModal: function() {
        if(!this.cancelMembershipModal)
          this.cancelMembershipModal = new ConfirmCancelView();
        this.cancelMembershipModal.render();
        this.cancelMembershipModal.show();
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      showChangePasswordModal: function() {
        if(!this.changePasswordModal)
          this.changePasswordModal = new ChangePasswordFormView();
        this.changePasswordModal.render();
        this.changePasswordModal.show();
      },

      /**
       * Display the modal that will allow donors to edit their membership
       */
      showEditMembershipModal: function() {
        if(!this.editMembershipModal)
          this.editMembershipModal = new EditMembershipFormView({router: this.router, model: Donor.get("subscriptions").data[0].plan});
        
        this.editMembershipModal.render();
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
