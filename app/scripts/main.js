Parse.initialize("gLBx6znzsrsBwyvjWsdrxKkrKn7MIQHlA2BTkhMR", "bh8PUYEckGb4ZeWjNQ8tv9POmTvzzN3L6NDWnzSq");

(function(){

  App.user = Parse.User.current();

  App.all_posts = new App.Collections.PostCollection();

  //  console.log('0');
  App.all_posts.fetch().done(function(){
  //  console.log('1');
    App.router = new App.Routers.BlogRouter();
    //console.log('2');
    Parse.history.start();
    //console.log('3');

  });
}());
