const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	article_id:{
		type:Schema.Types.ObjectId,
		ref:'articles'
	},
	user:{type:String,required:true},
	comment:{type:String,required:true},
},{
	timestamps: true
});

module.exports = mongoose.model('comments', schema)