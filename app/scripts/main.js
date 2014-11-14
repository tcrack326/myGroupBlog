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

  //$('#logoutBtn').hide();




  });

  $('#logoutBtn').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Parse.User.logOut();
      console.log(Parse.User.current());
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

  // $('#signUpBtn').on('click', function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     App.router.navigate('signup', { trigger: true });
  //     App.updateUser();
  // });
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
      $('#signature').text('User: ' + currentUser);
      $('#signUpBtn').text('Add New Post');
      $('#signUpBtn').attr('id', 'addPostBtn');
      $('#loginBtn').text('Logout');
      $('#loginBtn').attr('id', 'logoutBtn');

    }
  }

}());
