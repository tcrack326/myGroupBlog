Parse.initialize("gLBx6znzsrsBwyvjWsdrxKkrKn7MIQHlA2BTkhMR", "bh8PUYEckGb4ZeWjNQ8tv9POmTvzzN3L6NDWnzSq");

(function(){

  App.all_posts = new App.PostCollection();

  App.all_posts.fetch().done(function(){
    App.router = new App.Routers.BlogRouter();
    Parse.history.start();

  });
}());
