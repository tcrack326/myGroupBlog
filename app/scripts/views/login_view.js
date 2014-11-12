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
        },
        error: function(user){
          alert("Username or password not found.")
        }
      });

    }

  });
}());
