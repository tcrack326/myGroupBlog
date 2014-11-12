(function () {

  App.Views.ReadPost = Parse.View.extend({

    template: $('#readPostTemp').html(),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('viewContainer').html(this.$el);
    },

    render: function (post) {
      this.$el.html(this.template);
    }
  });


}());
