(function(){
App.Views.HomeView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

      this.collection.off();
      this.collection.on('sync', this.collection, this);

      //render is now in the query
      this.publishedPostsQuery();

    //this.render();


    $('#viewContainer').html(this.$el);
  },

  publishedPostsQuery: function () {

      var self = this;

      var userPosts = new Parse.Query(App.Models.PostModel);
      userPosts.equalTo('published', true);
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
