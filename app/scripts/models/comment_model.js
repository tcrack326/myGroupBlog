(function(){
  App.Models.CommentModel = Parse.Object.extend({

  className: 'Comment',

  idAttribute:'objectId',

    defaults:{
      content:''
    },


   initialize: function () {

    }
  });
}());
