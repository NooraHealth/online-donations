
define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'handlebars',   
  'hbs!templates/editMembershipModal',
  'models/Message',
  'views/MessageView',
  'bootstrap'
], function($, _, Backbone, Handlebars, editMembershipModal, Message, MessageView ){
    
    var EditMembershipView = Backbone.View.extend({
      el: "#modal",

      events: {
        "click #edit-membership-submit": "submit",
        "click #cancel-membership": "cancelMembership"
      },
      
      initialize: function(options) {
        console.log("initialzing the edit membership form view");
        this.router = options.router;
      },

      cancelMembership: function() {
        console.log("THIS IS WHERE I WILL CANCEL THE MEMBERSHIP");
      },

      /*
       * Validate login form input before submitting,
       * post error message to user if not valid
       */
      submit: function(e) {
        console.log("THIS IS WHERE I WILL SUBMIT INFO TO SERVER");
      },

      hide: function() {
        $('#edit-membership-modal').modal('hide');
      },

      show: function() {
        $('#edit-membership-modal').modal('show');
      },

      render: function() {
        console.log("rendering the edit membership modal");
        console.log(this.model);
        var html = editMembershipModal(this.model);
        this.$el.html(html);      
        
        this.message = new Message();
        this.messageView = new MessageView({model: this.message, el: $("#edit-membership-message")}); 
        this.messageView.render();
      }
    });
    return EditMembershipView;
  });
