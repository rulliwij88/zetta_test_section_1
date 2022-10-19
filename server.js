const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const app = express()

const mongoDB = process.env.DATABASE

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: process.env.DATABASE_NAME
}

if(process.env.NODE_ENV === 'production') {
	options.user = process.env.DB_USER
	options.pass = process.env.DB_PASSWORD
}
mongoose.connect(mongoDB, options)

mongoose.Promise = global.Promise

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Allow Cross-Origin requests
app.use(cors())

// Body parser, reading data from body into req.body
app.use(express.json({
	limit: '15kb'
	// limit: '20000kb'
}))

app.use(express.urlencoded({
	limit: '50mb',
	extended: true
}))

app.use('/', express.static('public'))
app.use('/', routes)

// handle undefined Routes
app.use('*', (req, res, next) => {
	return res.status(404).json({status:'Not Found', message:'undefined route', data:{}})
})

app.use((error,req, res, next) => {
	return res.status(400).json({status:'Error', message:error.message, data:{}})
})
const port = process.env.PORT || 8031
app.listen(port, () => {
	console.log(`Application is running on port ${port}`);
})
module.exports = app