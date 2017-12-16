 var  user = require('../../models/user');
 var  event = require('../../models/event');

module.exports = {
 	showone : function(req,res){
 		event.findById(req.params.id,function(err,result){
 			if(err)
 				console.log(err)
 			else
 			res.render("oneevent.ejs",{event:result,usertype : req.session.user.type });
 		})
 	},
 	showall : function(req,res){
 			var page;
 			if(!req.params.page||Number(req.params.page)<0)
 				page=0
 			else
 				page=req.params.page;

 			event.paginate({},{offset:Number(page)*3 ,limit:3 }, function(err,result){
 			if(err)
 				{console.log(err)}
 			else
 			{	//console.log(result.docs);
 				res.render("showallEvents.ejs",{events:result.docs,page:page});
 			}
 		})


 	}
}