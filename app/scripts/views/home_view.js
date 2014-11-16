(function(){
App.Views.HomeView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

    this.render();

    $('#viewContainer').html(this.$el);
  },

  render:function(){
      var self = this;
      this.collection.each(function(post){
        self.$el.append(self.template(post.toJSON()));
        console.log('in home render');

      });


  }
});
}());
