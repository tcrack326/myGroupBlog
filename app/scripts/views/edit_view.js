(function () {

  App.Views.EditPost = Parse.View.extend({

    events:{
      'click #editPostSubmit': 'submitEdit',
      'click #editDraftPostSubmit': 'submitDraftEdit',
      'click #deletePost': 'deletePost'
    },

    template: _.template($('#editPostTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#viewContainer').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template(this.options.post.toJSON()));
    },

    submitEdit:function(e){
      e.preventDefault();
      e.stopPropagation();

      this.options.post.set({
        title: $('#editPostTitle').val(),
        content: $('#editPostContent').val(),
        category: $('#editPostCategory').val().split(" "),
        published: true
      });


      this.options.post.save();
      App.router.navigate('',{ trigger : true });
    },

    submitDraftEdit:function(e){
      e.preventDefault();
      e.stopPropagation();

      this.options.post.set({
        title: $('#editPostTitle').val(),
        content: $('#editPostContent').val(),
        category:$('#editPostCategory').val().split(" "),
        published: false
      });


      this.options.post.save();
      App.router.navigate('',{ trigger : true });
    },


    deletePost:function(e){
      e.preventDefault();


      this.options.post.destroy();
      App.router.navigate('',{ trigger : true });


    }
  });
}());
