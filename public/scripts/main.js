var video=document.getElementById(file.Key);console.log(file.Key);var setCurTime=function(){video.currentTime=5},getCurTime=function(){console.log(video.currentTime)},candyBag=new Candy({name:"Test KitKat",calories:500}),CandyBag=Backbone.Collection.extend({model:Candy}),CandyBag=Backbone.Collection.extend({model:Candy}),CandyView=Backbone.View.extend({template:Handlebars.compile($("#candy-tpl").html()),render:function(){this.setElement(this.template(this.model.toJSON()))}});