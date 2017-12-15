var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var eventSchema = new mongoose.Schema({
	title:String,
	date:Date,
	organizer_id:ObjectId,
	location:String,
	description:String ,
	ticketprice: Number,
	comments:[{
		user_id:ObjectId,
		user_name:String ,
		title: String,
		rating: { type: Number, max: 5 } ,
		description: String ,
		createdat: { type: Date, default: Date.now }

	}],
	questions:[{
		user_id:ObjectId,
		user_name:String ,
		title: String,
		description: String ,
	    createdat: { type: Date, default: Date.now }

	}],
	createdat: { type: Date, default: Date.now }
});
var event = mongoose.model('Event',eventSchema);
module.exports = event;