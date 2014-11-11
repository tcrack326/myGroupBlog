(function(){
  App.Models.PostModel = Parse.Object.extend({
    defaults:{
      title:"",
      user:'',
      when:'',
      content:'',
    },


    initialize: function(){
      var title = this.get('title')
      console.log(title + " was submitted")

    }
  });
}());
