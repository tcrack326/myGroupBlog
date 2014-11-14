(function () {

  App.Views.EditPost = Parse.View.extend({

    events:{
      'click #editPostSubmit': 'submitEdit',
      'click #deletePost':'deletePost'
    },

    template: _.template($('#editPostTemp').html()),

    initialize: function (options) {
      this.options = options;
      console.log(this.options.post.toJSON());
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template(this.options.post.toJSON()));
    },

    submitEdit:function(e){
      e.preventDefault();

      this.options.post.set({
        title: $('#editPostTitle').val(),
        content: $('#editPostContent').val(),
        
      });

      console.log('edit' + this);
      this.options.post.save();
      App.router.navigate('',{ trigger : true });
    },

    deletePost:function(e){
      e.preventDefault();
      console.log('delete')

      this.options.post.destroy();
      App.router.navigate('',{ trigger : true });


    }
  });
}());
