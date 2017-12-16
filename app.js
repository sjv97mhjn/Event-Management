var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	mongoose		= require('mongoose'),
	request			= require('request'),
	session         = require('express-session'),
	controls		= require('./models/config'),
	user 			= require('./models/user'),
	event 			= require('./models/event'),
    route 			= require('./routes/route'),
    methodOverride  = require('method-override'),
    port 			= 3000;

app.set('views',['./views']);
app.use(methodOverride('_method'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static("public"));
app.use(require("express-session")({ secret:"My_Name_Is_Sajeev_Mahajan",resave:false,saveUninitialized :false}));
mongoose.Promise = global.Promise;
mongoose.connection.openUri(controls.mongourl);
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
//});

app.use('/',route);
app.listen(port,function(){
	console.log("Example App Listening On port" + port);
})