(function () {

  App.Views.ReadPost = Parse.View.extend({

    template: $('#readPostTemp').html(),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('viewContainer').html(this.$el);
    },

    render: function () {
      this.$el.html(this.template);
      this.$el.html(this.template(this.options.post.toJSON()));

      var postQuery = new Parse.Query(App.Model.PostModel)
      postQuery.equalTo('parent',this.options.post)

    }
  });


}());
