const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies.controller')
const reviewsController = require('../controllers/reviews.controller')
const { verifyToken, canUpdateMovie, validateIsAdmin } = require('../middlewares/authJwt')

router.get('/', moviesController.getAllMovies)

router.get('/:id', moviesController.getMovieById)

router.get('/admin/unpublished', [verifyToken, validateIsAdmin], moviesController.getUnpublishedMovies)

router.put('/:id', [verifyToken, canUpdateMovie], moviesController.updateMovie)

router.get('/reviews/:id', [verifyToken, validateIsAdmin], () => {})

router.put('/admin/publish/:id', [verifyToken, validateIsAdmin], moviesController.publishMovie)

router.post('/', verifyToken, moviesController.createMovie)

router.post('/review/:movieId', verifyToken, reviewsController.createReview)

router.delete('/:id', [verifyToken, validateIsAdmin], moviesController.deleteMovie)

module.exports = router