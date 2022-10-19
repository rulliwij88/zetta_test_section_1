const articleModels = require('../models/article.model')
const commentModels = require('../models/comment.model')
class commentController {
	async getArticle(req, res, next) {
		try {
			let page = req.query.page || 1
			let limit = req.query.limit || 10
			let title = req.query.title || ''
			let sortBy = req.query.sort || 'desc'
			let orderBy = req.query.order || 'createdAt'
			let options = {
				page: page,
				limit: limit,
			}
			let filter = {}
			if (title != '') {
				filter = {
					title: {$regex: title, '$options' : 'i' },
				}
			}
			let sort = 1
			if (sortBy != 'desc') {
				sort = -1
			}
			let dataArticle = articleModels.aggregate([
				{$match: filter},
				{$sort: {orderBy: parseInt(sort)}}
			])
			articleModels.aggregatePaginate(dataArticle, options)
			.then(function (result) {
				return res.json({
					message: "Data Articles",
					data: result
				})
			})
			.catch(function (error) {
				return error
			})
		} catch (err) {
			next(err)
		}
	}
	
	async detailArticle(req, res, next) {
		try {
			const id = req.params.id
			const result = await articleModels.findById({_id:id})
			if (result == null) {
				throw new Error('Articles is not found')
			}
			let dataComments = await commentModels.find({article_id:id})
			let resData = {
				article: result,
				comments: dataComments
			}

			return res.json({
				message: "Detail Articles",
				// data: result.toJSON()
				data: resData
			});
		} catch (err) {
			next(err)
		}
	}
	
	async createArticle(req, res, next) {
		try {
			const {title, article} = req.body
			const payload = {
				title:title,
				article:article,
				author:'Administrator',
			}
			const result = await articleModels.create(payload);
			return res.json({
				message: "Articles created successfully.",
				data: result.toJSON()
			});
		} catch (err) {
			next(err)
		}
	}
	
	async updateArticle(req, res, next) {
		try {
			const {id, title, article} = req.body
			const payload = {
				title:title,
				article:article,
			}
			const result = await articleModels.findOneAndUpdate({
				_id:id
			}, {
				$set:payload
			})
			if (result == null) {
				throw new Error('Articles updated failed')
			}
			return res.json({
				message: "Articles updated successfully.",
				data: result.toJSON()
			});
		} catch (err) {
			next(err)
		}
	}
	
	async deleteArticle(req, res, next) {
		try {
			const {id} = req.body
			const result = await articleModels.findOneAndDelete({_id:id})
			if (result == null) {
				throw new Error('Articles deleted failed')
			}
			return res.json({
				message: "Articles deleted successfully.",
				data: {}
			});
		} catch (err) {
			next(err)
		}
	}
}
module.exports = new commentController()