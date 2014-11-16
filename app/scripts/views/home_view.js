(function(){
App.Views.HomeView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

      this.collection.off();
      this.collection.on('sync', this.collection, this);

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
