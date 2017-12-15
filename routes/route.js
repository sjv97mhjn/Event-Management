
  var express    		  = require('express'),
   	  router  	   	  = express.Router(),
      bodyparser      = require('body-parser'),
      bcrypt          = require('bcrypt-nodejs'),
      session         = require('express-session'),
      mongoose        = require('mongoose'),
      request         = require('request'),
      session         = require('express-session'),
      controls        = require('../models/config'),
      user            = require('../models/user'),
      event           = require('../models/event'),
      Regex           = require('regex'),
      methodOverride  = require('method-override');





var routes = {
  views: {
    auth: require("./views/auth"),
    event: require("./views/event")
  }
}

function isloggedin(req,res,next){
        if(req.session.user)
        {
            return next();
        }
       else{
        res.redirect("/login");        
      }
      };

function isorganizerloggedin(req,res,next){
        if(req.session.user&&req.session.user.type=='Organizer')
        {    console.log(req.session.user)
            return next();
        }
       else{
        res.redirect("/login");        
      }
      }

//Authentication Routes  
router.get("/",routes.views.auth.home);
router.get("/register",routes.views.auth.register);        // Register Routes
router.post("/register",routes.views.auth.Register); 
router.get("/:email/verify",routes.views.auth.emailverify); //Verification routers
router.get("/login",routes.views.auth.login);
router.post("/login",routes.views.auth.Login);
router.get("/logout",routes.views.auth.logout);
router.get("/loggedin",isloggedin,routes.views.auth.loggedin);

//Event Routes
router.get("/organizer",isorganizerloggedin,routes.views.auth.organizer);
router.get("/createEvent",isorganizerloggedin,routes.views.event.create);
router.post("/createEvent",isorganizerloggedin,routes.views.event.Create);
router.get("/showevent/:id",isloggedin,routes.views.event.showone); //for both users
router.get("/showevents",isorganizerloggedin,routes.views.event.show);
router.get("/showallevents",isloggedin,routes.views.event.showall);  //for both users
router.delete("/deleteEvent/:id",isorganizerloggedin,routes.views.event.delete);
router.get("/updateEvent/:id",isorganizerloggedin,routes.views.event.update);
router.put("/updateEvent/:id",isorganizerloggedin,routes.views.event.Update);




module.exports = router;