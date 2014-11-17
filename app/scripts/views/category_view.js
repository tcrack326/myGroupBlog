(function(){
App.Views.CategoryView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

      this.collection.off();
      this.collection.on('sync', this.collection, this);


    this.categoryPostsQuery();
    //render is now in the query
    //this.render();


    $('#viewContainer').html(this.$el);
  },

  categoryPostsQuery: function () {

      var self = this;

      var categoryPosts = new Parse.Query(App.Models.PostModel);
      categoryPosts.equalTo('category', this.options.categoryPost);
      categoryPosts.find({
        success: function (results) {
          self.collection = results;
          self.render();
        }
      });

    },

  render:function(){

    var self = this;

      _.each(this.collection, function(post){

        self.$el.append(self.template(post.toJSON()));


      });


  }
});
}());
