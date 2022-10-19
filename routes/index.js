const express = require('express')
const router = express.Router()
const comments = require('./comment')
const articles = require('./article')

router.use('/comments', comments)
router.use('/articles', articles)
module.exports = router