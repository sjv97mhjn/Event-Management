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
		res.render("register.ejs",{error:null});
		   },
	    Register : function(req,res){
		var r = req.body;	
		var J=phone(r.PHONE);
		console.log(J);

	    if(r.EMAIL&&r.NAME&&r.USERNAME&&r.PHONE&&r.PASSWORD&&J){
		console.log(r);
   	    var UZER = new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE),password:r.PASSWORD,type:r.usertype} );
	    UZER.save(function(err,uzer){
		if(err){
			console.log(err);
			//throw err;		
			res.redirect("/register");	
		}
			//res.redirect('/login');
	   else{
	   	res.redirect('/login');
	   }


	})
		}
	else

	{   console.log("Some Fields Are Emplty");

		res.render("register.ejs",{error:'Some Fields Are Empty'});
	}
  },
  login :function(req,res){
	res.render("login.ejs",{error:null});
   },
  Login : function(req,res){
  	
  	user.findOne({username:req.body.username,password:req.body.password},function(err,result){
  		if(err){
  			console.log(err);
  			res.redirect("/login");
  		}
  		else
  		{
  			if(result==null)
  			{
  				console.log("No user found");
  				res.render("login.ejs",{error:'No User Found'});
  			}
  			else{
  				
  				req.session.user = result;
  				console.log(req.session.user);
  				if(result.type=='Organizer')
  				    res.redirect("/organizer");
  			    else if(result.type=='Participant')
  			    	res.redirect("/participant");
  			    else
  			    res.redirect("/loggedin")
  			}
  		}
  	})
  },
  
  logout : function(req,res){
	req.session.destroy();
	if(!req.user){
	res.redirect("/"); }
  },
  loggedin : function(req,res){
	console.log(req.session.user);
	res.render("loggedin.ejs");
 }

}