 var  user = require('../../models/user');
 var  event = require('../../models/event');

 module.exports = {
 	participant : function(req,res){
 		res.render("participant.ejs");
 	},
 	addcomment : function(req,res){
 	  var comment = {
 	  	user_id:req.session.user._id.toString(),
		user_name:req.session.user.username,
		title: req.body.title,
		rating: req.body.rating ,
		description: req.body.description 
 	  }



 	  event.findById(req.params.id,function(err,result){
 	  		if(err){
 	  			console.log(err);
 	  			//res.redirect("/");
 	  			res.redirect("/showevent/"+req.params.id);
 	  	
 	  		}
 	  	result.comments.push(comment);
 	  	result.save(function(err2,result2){
 	  		if(err2){
 	  			console.log(err2);
 	  					res.redirect("/showevent/"+req.params.id);
 	  			
 	  		}
 	  		else
 	  			res.redirect("/showevent/"+req.params.id);
 	  	})
 	  })
 	},
 	addquestion : function(req,res){
 		console.log("addquestion");
 	  var question = {
 	  	user_id:req.session.user._id.toString(),
		user_name:req.session.user.username,
		question: req.body.question, 
 	  }



 	  event.findById(req.params.id,function(err,result){
 	  		if(err){
 	  			console.log(err);
 	  			res.redirect("/showevent/"+req.params.id);
 	  	}
 	  	result.questions.push(question);
 	  	result.save(function(err2,result2){
 	  		if(err2){
 	  			console.log(err2);
 	  			res.redirect("/showevent/"+req.params.id);
 	  	}
 	  		else
 	  			res.redirect("/showevent/"+req.params.id);
 	  	})
 	  })
 	},
 	titlefilter : function(req,res){
 		console.log("Title");
 		console.log(req.body);
 		event.find({title:req.body.title }, function(err,result){
 			if(err)
 				{console.log(err)
 					res.redirect("/");
 	  	
 				}
 			else
 			{	console.log(result);
 				res.render("showfilterEvents.ejs",{events:result});
 			}
 		})
 	},
 	namefilter : function(req,res){
 		console.log("Organizer");
 		console.log(req.body);
 		event.find({organizer_name:req.body.name }, function(err,result){
 			if(err)
 				{console.log(err);
 					res.redirect("/");}
 			else
 			{
 				res.render("showfilterEvents.ejs",{events:result});
 			}
 		})
 	}


 }