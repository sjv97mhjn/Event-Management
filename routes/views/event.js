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
 			event.find({}, function(err,result){
 			if(err)
 				{console.log(err)}
 			else
 			{
 				res.render("showallEvents.ejs",{events:result});
 			}
 		})


 	}
}