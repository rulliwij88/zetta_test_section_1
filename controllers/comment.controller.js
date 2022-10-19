const commentModels = require('../models/comment.model')
const articleModels = require('../models/article.model')

class commentController {
	async detailComment(req, res, next) {
		try {
			const id = req.params.id
			const result = await commentModels.findById({_id:id})
			if (result == null) {
				throw new Error('Comments is not found')
			}
			return res.json({
				message: "Detail Comments",
				data: result.toJSON()
			});
		} catch (err) {
			next(err)
		}
	}

	async createComment(req, res, next) {
		try {
			const {comment, article_id} = req.body
			const checkArticle = await articleModels.findById(article_id)
			if (checkArticle == null) {
				throw new Error('Articles is not found')
			}
			const payload = {
				article_id:article_id,
				user:'anonymous',
				comment:comment,
			}
			const result = await commentModels.create(payload);
			return res.json({
				message: "Comments created successfully.",
				data: result.toJSON()
			});
		} catch (err) {
			next(err)
		}
	}
	
	async updateComment(req, res, next) {
		try {
			const {id, comment} = req.body
			const payload = {
				comment:comment,
			}
			const result = await commentModels.findOneAndUpdate({
				_id:id
			}, {
				$set:payload
			})
			if (result == null) {
				throw new Error('Comments updated failed')
			}
			return res.json({
				message: "Comments updated successfully.",
				data: result.toJSON()
			});
		} catch (err) {
			next(err)
		}
	}

	async deleteComment(req, res, next) {
		try {
			const {id} = req.body
			const result = await commentModels.findOneAndDelete({_id:id})
			if (result == null) {
				throw new Error('Comments deleted failed')
			}
			return res.json({
				message: "Comments deleted successfully.",
				data: {}
			});
		} catch (err) {
			next(err)
		}
	}
}
module.exports = new commentController()