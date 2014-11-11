(function(){
  App.Routers.BlogRouter = Parse.Router.extend({

    routes:{
      '' : 'home'
    },


    home: function(){
      new App.Views.Home();
    }


  });
}());
