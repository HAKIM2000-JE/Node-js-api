const mongoose = require('mongoose')


const answerschema = new mongoose.Schema({
    activity: {type: String, required: true},
	sector:{type: String, required: true},
	email: {type: String, required: true},
	firstname:{type: String, required: true},
	lastname:{type: String, required: true},
	phone:{type: String, required: true},
	score1: {type: String, required: true},
	score2: {type: String, required: true},
	score3: {type: String, required: true},
	score4: {type: String, required: true},
	score5: {type: String, required: true},
	score6: {type: String, required: true},
	score7: {type: String, required: true},
	score8: {type: String, required: true},
	score9: {type: String, required: true},
	score10: {type: String, required: true},
	score11: {type: String, required: true},
	score12: {type: String, required: true},
	score13: {type: String, required: true},
	score14: {type: String, required: true},
	GlobalComplexity:{type: String, required: true},
	Pricingmaturity:{type: String, required: true},
	hr : {type: String, required: true},
	tool:{type: String, required: true},
	data:{type: String, required: true},
	organization : {type: String, required: true},
	process : {type: String, required: true},
	zone : {type: String, required: true}
   


})








module.exports = mongoose.model('answer', answerschema)