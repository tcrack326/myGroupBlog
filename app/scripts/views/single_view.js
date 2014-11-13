(function () {

  App.Views.ReadPost = Parse.View.extend({

    template: _.template($('#readPostTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();
      $('#viewContainer').html(this.$el);
    },

    render: function () {
      var self = this;
      //this.$el.html(this.template);
      this.$el.html(this.template(this.options.post.toJSON()));

      // var postQuery = new Parse.Query(App.Models .PostModel);
      // postQuery.equalTo('author',this.options.post)
      //
      // console.log(postQuery);

    }
  });


}());
