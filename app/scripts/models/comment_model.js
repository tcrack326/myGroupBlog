(function(){
  App.Models.CommentModel = Parse.Object.extend({

  className: 'Comment',

  idAttribute:'objectId',

    defaults:{
      content:''
    },


   initialize: function () {
      var title = this.get('title');
      console.log(title + " was submitted");

    }
  });
}());
