(function(){
App.Views.HomeView = Parse.View.extend({

  tagName: 'ul',

  className:'postList',

  template: _.template($('#postTemp').html()),


  initialize:function(options){

    this.options = options;

    this.render();

    $('#viewContainer').html(this.$el);
  },

  render:function(){
      var self = this;

      var localCollection = this.collection;
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
         local_collection = _.sortBy(this.collection, function (model){
          return model[self.options.sort];
        });


  }
});
}());
