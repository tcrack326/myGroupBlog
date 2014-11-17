(function(){
App.Views.MyPostView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

      this.collection.off();
      this.collection.on('sync', this.collection, this);

      //render is now in the query
      this.userPostsQuery();

    //this.render();


    $('#viewContainer').html(this.$el);
  },

  userPostsQuery: function () {

      var self = this;
      App.user = Parse.User.current();

      var userPosts = new Parse.Query(App.Models.PostModel);
      userPosts.equalTo('author', App.user);
      userPosts.find({
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
