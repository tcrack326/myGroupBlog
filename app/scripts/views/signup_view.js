(function(){
  App.Views.Signup = Parse.View.extend({

    events:{
      'submit #signUpForm': 'userSignUp'
    },

    template: $('#signUpTemp').html(),

    initialize:function(){
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render:function(){
      this.$el.html(this.template);
    },
    userSignUp: function(){
      var username = $('#usernameNew').val();
      var password = $('#passwordNew').val();
      var email = $('#emailNew')

      Parse.User.signUp( username, password, email,{
        success: function(user){
          App.user = user;
          App.router.navigate('',{ trigger: true });

        }
      });

    }

  });
}());
