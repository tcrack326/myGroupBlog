(function(){
  App.Models.PostModel = Parse.Object.extend({

  className: 'Post',

  idAttribute:'objectId',

    defaults:{
      title:'',
      content:'',
      authorName:'',
      category:[],
      published:false

    },


   initialize: function () {

    }
  });
}());
