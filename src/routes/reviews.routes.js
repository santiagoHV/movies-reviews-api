const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviews.controller')
const { verifyToken, validateIsAdmin } = require('../middlewares/authJwt')

router.post('/:movieId', verifyToken, reviewsController.createReview)

router.delete('/:id', [verifyToken, validateIsAdmin], reviewsController.deleteReview)

module.exports = router