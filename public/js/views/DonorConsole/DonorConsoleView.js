define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',  // lib/backbone/backbone
  'handlebars',
  'hbs!templates/donorConsole',
  'views/MessageView',
  'models/Message',
  'views/DonorConsole/modals/EditMembershipFormView',
  'views/DonorConsole/modals/ChangePasswordFormView',
  'views/DonorConsole/modals/ChangeEmailModal',
  'views/DonorConsole/modals/GiveAgainView',
  'views/DonorConsole/modals/ConfirmCancelView',
  'views/DonorConsole/modals/ChangePaymentInfoView',
  'bootstrap'
], function($, _, Backbone, Handlebars, donorConsoleTemplate, 
           MessageView, Message, EditMembershipFormView, ChangePasswordFormView, ChangeEmailModalView, GiveAgainView, 
           ConfirmCancelView, ChangePaymentInfoView){
    var DonorConsole = Backbone.View.extend({
      
      el: "#body",
      
      initialize: function() {
        //Rerender the Donor console whenever there is a change to the donor object
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'sync', this.render);
      },

      events: {
        "click #edit-membership": "showEditMembershipModal", 
        "click #change-password": "showChangePasswordModal",
        "click #change-email": "showChangeEmailModal",
        "click #give-again": "showGiveAgainModal",
        "click #cancel-membership": "showCancelMembershipModal",
        "click #change-payment-info": "showChangePaymentModel",
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      showChangePaymentModel: function() {
        if(!this.changePaymentModal)
          this.changePaymentModal = new ChangePaymentInfoView({donor: this.model});
        this.changePaymentModal.render();
        this.changePaymentModal.show();
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      showGiveAgainModal: function() {
        if(!this.giveAgainModal)
          this.giveAgainModal = new GiveAgainView({donor: this.model});
        this.giveAgainModal.render();
        this.giveAgainModal.show();
      },
      
      /**
       * Display the modal that will allow donors to change their password
       */
      showCancelMembershipModal: function() {
        console.log("cancel membership click!");
        if(!this.cancelMembershipModal)
          this.cancelMembershipModal = new ConfirmCancelView({donor: this.model});
        this.cancelMembershipModal.render();
        this.cancelMembershipModal.show();
      },

      /**
       * Display the modal that will allow donors to change their password
       */
      showChangePasswordModal: function() {
        if(!this.changePasswordModal)
          this.changePasswordModal = new ChangePasswordFormView({donor: this.model});
        this.changePasswordModal.render();
        this.changePasswordModal.show();
      },      
      
      /**
       * Display the modal that will allow donors to change their email
       */
      showChangeEmailModal: function() {
        if(!this.changeEmailModal)
          this.changeEmailModal = new ChangeEmailModalView({donor: this.model});
        this.changeEmailModal.render();
        this.changeEmailModal.show();
      },

      /**
       * Display the modal that will allow donors to edit their membership
       */
      showEditMembershipModal: function() {
        if(!this.editMembershipModal)
          this.editMembershipModal = new EditMembershipFormView({router: this.router, donor: this.model});
        
        this.editMembershipModal.render();
        this.editMembershipModal.show();
      },

      rotatePhotoCarousel: function() {
        var index = 0;
        var photos = $(".noora-carousel");
        photos.slice(1).each(function(index, photo) {
          $(photo).hide();
        });
        
        rotate = function() {
          var previous = photos[index];
          $(previous).fadeOut(1000);

          var nextIndex;
          if (index >= photos.length - 1 ) {
            nextIndex = 0;
          } else {
            nextIndex = ++index;
          }

          var next = photos[nextIndex];
          $(next).fadeIn(1000);
          
          index = nextIndex;
        }

        rotate();
        setInterval(rotate,  6000); 
      },

      render: function() {
        var html = donorConsoleTemplate(this.model.toJSON());
        this.$el.html(html);      
        // start carousel
        $("#carousel").carousel({interval: 3000});
        
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#console-message")}); 
        this.messageView.render();

        this.rotatePhotoCarousel();
        
        return this;
      },
      
    });
    
    return DonorConsole;
  });
