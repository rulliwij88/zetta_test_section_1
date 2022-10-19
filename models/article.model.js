const mongoose = require('mongoose')
const aggregatePaginate = require("mongoose-aggregate-paginate-v2")
const Schema = mongoose.Schema

let schema = new Schema({
	author:{type:String,required:true},
	title:{type:String,required:true},
	article:{type:String,required:true},
},{
	timestamps: true
})
schema.plugin(aggregatePaginate)
module.exports = mongoose.model('articles', schema)