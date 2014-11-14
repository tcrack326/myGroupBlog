(function(){
  App.Views.GuestHeader = Parse.View.extend({

    template: _.template($('#guestHeaderTemp').html()),

    initialize:function(){
      this.render();
      $('#topHeader').html(this.$el)
    },
    render:function(){
      this.$el.html(this.template);
    }


  });
}());
