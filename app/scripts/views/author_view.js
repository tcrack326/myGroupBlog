(function(){
App.Views.AuthorView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

      this.collection.off();
      this.collection.on('sync', this.collection, this);

    this.authorPostsQuery();
    //render is now in the query
    //this.render();


    $('#viewContainer').html(this.$el);
  },

  authorPostsQuery: function () {

      var self = this;

      var authorPosts = new Parse.Query(App.Models.PostModel);
      authorPosts.equalTo('authorName', this.options.authorPost);
      authorPosts.find({
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
