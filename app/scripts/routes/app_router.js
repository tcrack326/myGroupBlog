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
