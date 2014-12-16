Parse.initialize("gLBx6znzsrsBwyvjWsdrxKkrKn7MIQHlA2BTkhMR", "bh8PUYEckGb4ZeWjNQ8tv9POmTvzzN3L6NDWnzSq");

(function(){

  App.user = Parse.User.current();

  App.all_posts = new App.Collections.PostCollection();
  App.all_comments = new App.Collections.CommentCollection();
  App.all_comments.fetch();

  App.all_posts.fetch().done(function(){

    App.router = new App.Routers.BlogRouter();

    Parse.history.start();



  });

  $('#logoutBtn').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Parse.User.logOut();
      $('#addPostBtn').text('Signup');
      $('#addPostBtn').attr('id', 'signUpBtn');
      $('#logoutBtn').text('Login');
      $('#logoutBtn').attr('id', 'loginBtn');
      App.updateUser();
      App.router.navigate('', { trigger: true });
  });

  $('#loginBtn').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      App.router.navigate('login', { trigger: true });
      App.updateUser();
  });

  $('#signUpBtn').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      App.router.navigate('signup', { trigger: true });
      App.updateUser();
  });
  //
  // $('#addPostBtn').on('click', function () {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     App.router.navigate('newpost', { trigger: true });
  // });


  App.updateUser = function () {
    App.user = Parse.User.current();
    var currentUser;
    if (App.user === null){
      currentUser = '';
      $('#signature').text('');
    }
    else {
      currentUser = App.user.attributes.username;
      $('#signature').text('Welcome, ' + currentUser);
      $('#signUpBtn').text('Add New Post');
      $('#signUpBtn').attr('id', 'addPostBtn');
      $('#loginBtn').text('Logout');
      $('#loginBtn').attr('id', 'logoutBtn');

    }
  }

}());

(function(){
  App.Views.Login = Parse.View.extend({

    events:{
      'submit #loginForm': 'userLogin'
    },

    template: $('#loginTemp').html(),

    initialize:function(){
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render:function(){
      this.$el.html(this.template);
    },
    userLogin: function(){
      var username = $('#username').val();
      var password = $('#password').val();

      Parse.User.logIn( username, password,{
        success: function(user){
          App.user  = user;
          App.router.navigate('',{ trigger: true });
          App.updateUser();
        },
        error: function(user){
          alert("Username or password not found.")
        }
      });

    }

  });
}());

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

(function(){
  App.Views.Signup = Parse.View.extend({

    events:{
      'click #signUpSubmit': 'userSignUp'
    },

    template: $('#signUpTemp').html(),

    initialize:function(){
      console.log("routed");
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render:function(){
      this.$el.html(this.template);
    },
    userSignUp: function(e){
      e.preventDefault();

      var username = $('#usernameNew').val();
      var password = $('#passwordNew').val();
      var email = $('#emailNew').val();

      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      user.signUp(null,{

        success: function(user){
          console.log('2');
          App.user = user;
          console.log('3');
          App.router.navigate('', { trigger: true});
          App.updateUser();
        }
      });
    }
  });
}());

(function(){
  App.Views.AddPost = Parse.View.extend({

    events:{
      'click #newPostSubmit': 'submitNew',
      'click #newPostPublish': 'publishNew'
    },

    template: $('#newPostTemp').html(),

    initialize:function(){

      this.render();

      $('#viewContainer').html(this.$el);
    },

    render:function(){
      this.$el.html(this.template);
    },
    submitNew:function(e){
      e.preventDefault();

      post = new App.Models.PostModel({
        title: $('#newPostTitle').val(),
        content: $('#newPostContent').val(),

        category:$('#newPostCategory').val().split(","),
        authorName: App.user.attributes.username,

        published: false,
        author: App.user
      });


      var postACL = new Parse.ACL(App.user);
      postACL.setPublicReadAccess(true);
      post.setACL(postACL);
      //publicPost.save();
      //post.setACL(new Parse.ACL(App.user));

        post.save(null, {
          success: function(){
            App.all_posts.add(post);
            App.router.navigate('', { trigger : true });
          }
        });

    },

    publishNew:function(e){
      e.preventDefault();

      post = new App.Models.PostModel({
        title: $('#newPostTitle').val(),
        content: $('#newPostContent').val(),
        category:$('#newPostCategory').val().split(" "),
        published: true,

        authorName: App.user.attributes.username,

        author: App.user
      });


      var postACL = new Parse.ACL(App.user);
      postACL.setPublicReadAccess(true);
      post.setACL(postACL);
      //publicPost.save();
      //post.setACL(new Parse.ACL(App.user));

        post.save(null, {
          success:function(){
            App.all_posts.add(post);
            App.router.navigate('', { trigger : true });
          }
        });

    }

  });
}());

(function () {

  App.Views.ReadPost = Parse.View.extend({

    events: {
      'click #addCommentBtn': 'addComment'
    },

    template: _.template($('#readPostTemp').html()),
    commentTemplate: _.template($('#commentTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();
      $('#viewContainer').html(this.$el);

      //Hide the edit button if the author is different than the user
      //Hide comment area if not logged in
      App.user = Parse.User.current();
      if (App.user === null){
        $('#editBtn').hide();
        $('#commentArea').hide();
        $('#addCommentBtn').hide();
      }

      else if (App.user.id != this.options.post.attributes.author.id){
         $('#editBtn').hide();
      }

      //Add the comments to the post
      this.commentQuery();

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
          _.each(results, function (comment) {
            console.log(comment);
            comment.attributes.author.fetch().then(function (fetchedAuthor){
              //console.log(fetchedAuthor);
              $('#commentsList').append(self.commentTemplate(comment.attributes));
            });


          });
        }
      });
    },

    addComment: function (e) {
      var self = this;
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
            $('#commentsList').append(self.commentTemplate(comment.attributes));

          }
        });

      $('#commentArea').reset();
    }
  });


}());

(function () {

  App.Views.ReadPost = Parse.View.extend({

    events: {
      'click #addCommentBtn': 'addComment'
    },

    template: _.template($('#draftPostTemp').html()),
    commentTemplate: _.template($('#commentTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();
      $('#viewContainer').html(this.$el);

      //Hide the edit button if the author is different than the user
      //Hide comment area if not logged in
      App.user = Parse.User.current();
      if (App.user === null){
        $('#editBtn').hide();
        $('#commentArea').hide();
        $('#addCommentBtn').hide();
      }

      else if (App.user.id != this.options.post.attributes.author.id){
         $('#editBtn').hide();
      }

      //Add the comments to the post
      this.commentQuery();

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
          _.each(results, function (comment) {
            console.log(comment);
            comment.attributes.author.fetch().then(function (fetchedAuthor){
              //console.log(fetchedAuthor);
              $('#commentsList').append(self.commentTemplate(comment.attributes));
            });


          });
        }
      });
    },

    addComment: function (e) {
      var self = this;
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
            $('#commentsList').append(self.commentTemplate(comment.attributes));

          }
        });

      $('#commentArea').reset();
    }
  });


}());

(function () {

  App.Views.EditPost = Parse.View.extend({

    events:{
      'click #editPostSubmit': 'submitEdit',
      'click #editDraftPostSubmit': 'submitDraftEdit',
      'click #deletePost': 'deletePost'
    },

    template: _.template($('#editPostTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template(this.options.post.toJSON()));
    },

    submitEdit:function(e){
      e.preventDefault();
      e.stopPropagation();

      this.options.post.set({
        title: $('#editPostTitle').val(),
        content: $('#editPostContent').val(),
        category: $('#editPostCategory').val().split(" "),
        published: true
      });


      this.options.post.save();
      App.router.navigate('',{ trigger : true });
    },

    submitDraftEdit:function(e){
      e.preventDefault();
      e.stopPropagation();

      this.options.post.set({
        title: $('#editPostTitle').val(),
        content: $('#editPostContent').val(),
        category:$('#editPostCategory').val().split(" "),
        published: false
      });


      this.options.post.save();
      App.router.navigate('',{ trigger : true });
    },


    deletePost:function(e){
      e.preventDefault();


      this.options.post.destroy();
      App.router.navigate('',{ trigger : true });


    }
  });
}());

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

(function(){
  App.Routers.BlogRouter = Parse.Router.extend({

    routes: {
      '' : 'home',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'newpost': 'newPost',
      'singlePost/:id' : 'singlePost',
      'edit/:id' : 'editPost',

      'myposts' : 'myPost',
      'author/:author' : 'authorPost',
      'category/:category' : 'categoryPost'

    },


    home: function (category) {
      if(App.user){
        new App.Views.ActiveHeader();
      }else{
        new App.Views.GuestHeader();
      };
      new App.Views.HomeView({collection: App.all_posts, sort: category});
    },
    userLogin: function () {
      new App.Views.Login();
    },
    userSignUp: function(){
      new App.Views.Signup();
    },
    newPost:function(){
      new App.Views.AddPost();
    },

    singlePost: function(id) {
      var singlePost = App.all_posts.get(id);
      new App.Views.ReadPost({ post: singlePost , collection: App.all_posts});

    },

    editPost: function(id) {
      var editPost = App.all_posts.get(id);
      new App.Views.EditPost({ post: editPost });
    },

    myPost: function() {
      new App.Views.MyPostView({ collection: App.all_posts });
    },

    authorPost: function (author) {
      new App.Views.AuthorView({ authorPost: author, collection: App.all_posts });
    },

    categoryPost: function (category) {
      new App.Views.CategoryView({ categoryPost: category, collection: App.all_posts });
    }


  });
}());

(function(){
  App.Models.PostModel = Parse.Object.extend({

  className: 'Post',

  idAttribute:'objectId',

    defaults:{
      title:'',
      content:'',
      authorName:'',
      category:[],
      published:false

    },


   initialize: function () {

    }
  });
}());

(function(){
  App.Models.CommentModel = Parse.Object.extend({

  className: 'Comment',

  idAttribute:'objectId',

    defaults: {
      content:''
    },


   initialize: function () {

    }
  });
}());

(function (){

  App.Collections.PostCollection = Parse.Collection.extend({
    model: App.Models.PostModel
  });
}());

(function (){

  App.Collections.CommentCollection = Parse.Collection.extend({
    model: App.Models.CommentModel
  });
}());
