(function(){
  App.Views.ActiveHeader = Parse.View.extend({

    template: _.template($('#userHeaderTemp').html()),

    events:{
      'click #logOutBtn' : 'userLogOut'
    },

    initialize:function(){
      this.render();
      $('#topHeader').html(this.$el)
    },
    render:function(){
      this.$el.html(this.template);
    },

    userLogOut: function(){
      Parse.User.logOut();
    }


  });
}());
