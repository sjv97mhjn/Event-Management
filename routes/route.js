
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
    event: require("./views/event"),
    organizer: require("./views/organizer"),
    participant: require("./views/participant")

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
        {    //console.log(req.session.user)
            return next();
        }
       else{
        res.redirect("/login");        
      }
      }

function isparticipantloggedin(req,res,next){
        if(req.session.user&&req.session.user.type=='Participant')
        {   // console.log(req.session.user)
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
router.get("/showallEvents",isloggedin,routes.views.event.showall); //for both users
router.get("/showallEvents/:page",isloggedin,routes.views.event.showall); //for both users
router.get("/showEvent/:id",isloggedin,routes.views.event.showone); //for both users

//Organizer Routes
router.get("/organizer",isorganizerloggedin,routes.views.organizer.organizer);
router.get("/organizer/createEvent",isorganizerloggedin,routes.views.organizer.create);
router.post("/organizer/createEvent",isorganizerloggedin,routes.views.organizer.Create);
router.get("/organizer/showmyEvents",isorganizerloggedin,routes.views.organizer.show);
router.delete("/organizer/deleteEvent/:id",isorganizerloggedin,routes.views.organizer.delete);
router.get("/organizer/updateEvent/:id",isorganizerloggedin,routes.views.organizer.update);
router.put("/organizer/updateEvent/:id",isorganizerloggedin,routes.views.organizer.Update);

//Participants Route
router.get("/participant",isparticipantloggedin,routes.views.participant.participant);
router.post("/participant/addcomment/:id",isparticipantloggedin,routes.views.participant.addcomment);
router.post("/participant/addquestion/:id",isparticipantloggedin,routes.views.participant.addquestion);
router.post("/filterbytitle",isparticipantloggedin,routes.views.participant.titlefilter);
router.post("/filterbyname",isparticipantloggedin,routes.views.participant.namefilter);


module.exports = router;