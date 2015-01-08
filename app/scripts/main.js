Parse.initialize("0EzgEwdLayMVQDmgd21dMXrHgs8cRSoVwFOa3TPg", "ue84s9ehnEATPuerobHXaWqYa2iPUFxNHzkPfEH2");

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
