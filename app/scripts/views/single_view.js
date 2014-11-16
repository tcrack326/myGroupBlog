(function () {

  App.Views.ReadPost = Parse.View.extend({

    events: {
      'click #addCommentBtn': 'addComment'
    },

    template: _.template($('#readPostTemp').html()),

    initialize: function (options) {
      this.commentQuery();
      console.log(this.commentsCollection);
      this.options = options;
      this.render();
      $('#viewContainer').html(this.$el);

      //Hide the edit button if the author is different than the user
      App.user = Parse.User.current();
      if (App.user === null){
        $('#editBtn').hide();
        $('#commentArea').hide();
        $('#addCommentBtn').hide();
      }

      else if (App.user.id != this.options.post.attributes.author.id){
         $('#editBtn').hide();
         $('#commentArea').hide();
         $('#addCommentBtn').hide();
      }
    },

    render: function () {
      // var self = this;
      //this.$el.html(this.template);


      this.$el.html(this.template(this.options.post.toJSON()));


      // var postQuery = new Parse.Query(App.Models .PostModel);
      // postQuery.equalTo('author',this.options.post)
      //
      // console.log(postQuery);

    },

    commentQuery: function () {
      var self = this;
      var commentQuery = new Parse.Query(App.Models.CommentModel);
      commentQuery.equalTo('post', this.options.post);
      commentQuery.find({
        success: function (results) {
          self.commentsCollection = results;
        }
      });
    },

    addComment: function (e) {
      e.preventDefault();

      comment = new App.Models.CommentModel({
        content: $('#commentArea').val(),
        author: App.user,
        post: this.options.post
      });


      var commentACL = new Parse.ACL(App.user);
      commentACL.setPublicReadAccess(true);
      comment.setACL(commentACL);

        comment.save(null, {
          success:function () {
            App.all_comments.add(comment);
          }
        });

        console.log(comment);

    }
  });


}());
