 var  user = require('../../models/user');
 var  event = require('../../models/event');

var mydate = function(mydate){
	console.log("If error at mydate function");
	var dd = mydate.getDate();
	var mm = mydate.getMonth()+1; //January is 0!
	var yyyy = mydate.getFullYear();

				if(dd<10) {
				dd='0'+dd;
				} 

				if(mm<10) {
				    mm='0'+mm;
				} 

				return ( yyyy+'-'+mm+'-'+dd );
}
 
 module.exports = {
 	create : function(req,res){
 		res.render("createEvent.ejs");
 	},
 	Create : function(req,res){
 		console.log(req.body);
 		var Event = new event ({
 			title:req.body.Title,
			//organizer_id:req.user._id,
			organizer_id:req.session.user._id.toString(),
			location:req.body.Location,
			description:req.body.Description ,
			ticketprice:req.body.Price,
			date:req.body.Date
 		});
 		Event.save(function(err,result){
 			if(err)
 				{console.log(err);}
 			else
 				console.log("Saved");
 				res.redirect("/organizer");
 		})
 	},
 	show : function(req,res){
 		event.find({organizer_id:req.session.user._id.toString() }, function(err,result){
 			if(err)
 				{console.log(err)}
 			else
 			{
 				res.render("showEvents.ejs",{events:result});
 			}
 		})
 	},
 	delete : function(req,res){
 		event.remove({_id:req.params.id},function(err,result){
 			if(err)
 				console.log(err)
 			else{
 				
 				res.redirect("/showEvents");
 			}
 		})
 	},
 	update : function(req,res){
 		event.findById(req.params.id,function(err,result){
 			if(err)
 				console.log(err);
 			else{
 				date = mydate(result.date);
 				res.render("updateEvent.ejs",{event:result,date:date});
 			}
 		})
 	},
 	Update : function(req,res){
 		event.updateOne({ _id: req.params.id }, { $set: { title:req.body.Title,
			organizer_id: req.session.user._id.toString(),
			location:req.body.Location,
			description:req.body.Description ,
			ticketprice:Number(req.body.Price),
			date:req.body.Date } }, function(err,result){
				if(err)
					console.log(err);
				else
					res.redirect("/showEvents");

			});

 	},
 	showone : function(req,res){
 		event.findById(req.params.id,function(err,result){
 			if(err)
 				console.log(err)
 			else
 			res.render("oneevent.ejs",{event:result});
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