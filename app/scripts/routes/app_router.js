(function(){
  App.Routers.BlogRouter = Parse.Router.extend({

    routes:{
      '' : 'home',
      'login' : 'userLogin',
      'signup' : 'userSignUp',
      'newpost': 'newPost'
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
    }


  });
}());
