(function () {

  App.Views.ReadPost = Parse.View.extend({

    template: _.template($('#readPostTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();
      $('#viewContainer').html(this.$el);

      //Hide the edit button if the author is different than the user
      App.user = Parse.User.current();
      if (App.user === null){
        $('#editBtn').hide();
      }

      else if (App.user.id != this.options.post.attributes.author.id){
         $('#editBtn').hide();
      }
    },

    render: function () {
      // var self = this;
      //this.$el.html(this.template);


      //if(this.options.post.id != App.user.id){
      //  console.log("hey there");
    //  }
      this.$el.html(this.template(this.options.post.toJSON()));

      // var postQuery = new Parse.Query(App.Models .PostModel);
      // postQuery.equalTo('author',this.options.post)
      //
      // console.log(postQuery);

    }
  });


}());
