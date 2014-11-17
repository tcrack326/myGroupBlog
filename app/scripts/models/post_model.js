(function(){
  App.Models.PostModel = Parse.Object.extend({

  className: 'Post',

  idAttribute:'objectId',

    defaults:{
      title:'',
      content:'',
<<<<<<< HEAD
      category:'',
=======
      category:[],
      published:false
>>>>>>> b3c8762c581599ac0cddca8be16e0607b8a1bb0e
    },


   initialize: function () {

    }
  });
}());
