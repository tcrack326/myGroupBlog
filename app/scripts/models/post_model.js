(function(){
  App.Models.PostModel = Parse.Object.extend({

  className: 'Post',

  idAttribute:'objectId',

    defaults:{
      title:'',
      content:'',
      category:[],
    },


   initialize: function () {
      
    }
  });
}());
