
  var express    		  = require('express'),
   	  router  	   	  = express.Router(),
      bodyparser      = require('body-parser'),
      bcrypt          = require('bcrypt-nodejs'),
      session         = require('express-session'),
      mongoose        = require('mongoose'),
      request         = require('request'),
      ses             = require('node-ses'), 
      session         = require('express-session'),
      controls        = require('../models/config'),
      client          = ses.createClient({ key: controls.Ases_KID, secret: controls.Ases_AKey}),
      user            = require('../models/user'),
      Regex           = require('regex');





var routes = {
  views: {
    index: require("./views/index")
  }
}

function isloggedin(req,res,next){
        if(req.session.user)
        {
            return next();
        }
       else{
        res.redirect("/");        
      }
      }


router.get("/",routes.views.index.home);
router.get("/register",routes.views.index.register);        // Register Routes
router.post("/register",routes.views.index.Register); 
router.get("/:email/verify",routes.views.index.emailverify); //Verification routers
router.get("/login",routes.views.index.login);
router.post("/login",routes.views.index.Login);
router.get("/logout",routes.views.index.logout);
router.get("/loggedin",isloggedin,routes.views.index.loggedin);


module.exports = router;