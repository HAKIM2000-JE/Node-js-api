const mongoose = require('mongoose')


const filmschema = new mongoose.Schema({
    title: {type: String},
	id:{type: String},
	poster_path: {type: String},
	vote_average:{type: String},
	orginal_title:{type: String},
	overview:{type: String},
	relase_date: {type: String},
	


})








module.exports = mongoose.model('film', filmschema)