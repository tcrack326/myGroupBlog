(function(){
  App.Routers.BlogRouter = Parse.Router.extend({

    routes:{
      '' : 'home',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'newpost': 'newPost',
      'singlePost/:id' : 'singlePost',
      'edit/:id' : 'editPost'
    },


    home: function () {
      new App.Views.HomeView({collection: App.all_posts});
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
      var readPost = App.all_posts.get(id);
      new App.Views.ReadPost({ post: readPost , collection: App.all_posts});
    },

    edit: function(id) {
      var editPost = App.all_posts.get(id);
      new App.Views.EditPost({ post: editPost });
    }


  });
}());
