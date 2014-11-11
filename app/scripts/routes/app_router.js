(function(){
  App.Routers.BlogRouter = Parse.Router.extend({

    routes:{
      '' : 'home',
      'login' : 'userLogin',
      'signup' : 'userSignUp'
    },


    home: function () {
      new App.Views.HomeView({collection: App.all_posts});
    },
    userLogin: function () {
      new App.Views.Login();
    },
    userSignUp: function(){
      new App.Views.Signup();
    }


  });
}());
