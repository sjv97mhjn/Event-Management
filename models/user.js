var mongoose = require('mongoose');
var userschema = new mongoose.Schema({
	username: String,
	type:String,
	name: String,
	password:String,
	email:String,
	phone:Number,
	createdat: { type: Date, default: Date.now }
});
var user = mongoose.model('User',userschema);
module.exports = user;