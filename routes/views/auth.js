 var  user = require('../../models/user');
 var  event = require('../../models/event');


 var phone = function(phone){
var j = 0; 
	for(i=0;i<phone.length;i++)
	{  //console.log(phone[i]);
		if(phone[i]<'0'||phone[i]>'9')
		{  
			j++;	
		}
	}
	return j;
}
 



module.exports = {
		home :function(req,res){
			if(req.session.user&&req.session.user.type=='Organizer')
				res.redirect('/organizer');
		res.render("home.ejs");
       },

	    register : function(req,res){
		res.render("register.ejs");
		   },
	    Register : function(req,res){
		var r = req.body;	
		var J=phone(r.PHONE);
		console.log(J);

	    if(r.EMAIL!=null&&r.NAME!=null&&r.USERNAME!=null&&r.PHONE!=null&&r.PASSWORD!=null&&J==0){
		console.log(r);
   	    var UZER = new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE),password:r.PASSWORD,type:r.usertype} );
	    UZER.save(function(err,uzer){
		if(err){
			//console.log(err);
			throw err;			
		}
			//res.redirect('/login');
	   else{
	   	res.redirect('/login');
	   }


	})
		}
	else

	{  console.log("Some Fields Are Emplty");
	
		res.redirect("/register");
	}
  },

  emailverify : function(req,res){
		//res.render("/login");
		var Email = req.params.email;
		console.log(Email);
		user.findOneAndUpdate({email:Email},{$set:{verified:1}},function(err,result){
			if(err) console.log(err);
			else {
				console.log("Email Verified");
				res.redirect("/login");
			}
		})
	},
  login :function(req,res){
	res.render("login.ejs");
   },
  Login : function(req,res){
  	
  	user.findOne({username:req.body.username,password:req.body.password},function(err,result){
  		if(err){
  			console.log(err);
  		}
  		else
  		{
  			if(result==null)
  			{
  				console.log("No user found");
  			}
  			else{
  				req.session.user = result;
  				if(result.type=='Organizer')
  				res.redirect("/organizer");
  			    else
  			    res.redirect("/loggedin")
  			}
  		}
  	})



  },
  organizer:function(req,res){
  	res.render("organizer.ejs");
  },
  logout : function(req,res){
	req.logout();

	if(!req.user){
	res.redirect("/"); }
  },
  loggedin : function(req,res){
	console.log(req.session.user);
	res.render("loggedin.ejs");
 }

}