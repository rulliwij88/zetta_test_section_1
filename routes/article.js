const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article.controller')

router.get('/', articleController.getArticle)
router.get('/:id', articleController.detailArticle)
router.post('/', articleController.createArticle)
router.patch('/', articleController.updateArticle)
router.delete('/', articleController.deleteArticle)
module.exports = router