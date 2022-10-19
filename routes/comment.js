const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

router.get('/:id', commentController.detailComment)
router.post('/', commentController.createComment)
router.patch('/', commentController.updateComment)
router.delete('/', commentController.deleteComment)
module.exports = router