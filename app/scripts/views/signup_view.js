(function(){
  App.Views.Signup = Parse.View.extend({

    events:{
      'click #signUpSubmit': 'userSignUp'
    },

    template: $('#signUpTemp').html(),

    initialize:function(){
      console.log("routed");
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render:function(){
      this.$el.html(this.template);
    },
    userSignUp: function(e){
      e.preventDefault();

      var username = $('#usernameNew').val();
      var password = $('#passwordNew').val();
      var email = $('#emailNew').val();

      var user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);

      user.signUp(null,{

        success: function(user){
          console.log('2');
          App.user = user;
          console.log('3');
          App.router.navigate('', { trigger: true});
        }
      });
    }
  });
}());
