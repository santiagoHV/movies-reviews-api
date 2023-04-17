const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies.controller')
const { verifyToken, canUpdateMovie, validateIsAdmin } = require('../middlewares/authJwt')

router.get('/', moviesController.getAllMovies)

router.get('/:id', moviesController.getMovieById)

router.get('/unpublished', [verifyToken, validateIsAdmin], () => {})

router.get('/reviews/:id', [verifyToken, validateIsAdmin], () => {})

router.put('/publish/:id', [verifyToken, validateIsAdmin], () => {})

router.post('/', verifyToken, moviesController.createMovie)

router.put('/:id', [verifyToken, canUpdateMovie], moviesController.updateMovie)

router.delete('/:id', [verifyToken, validateIsAdmin], moviesController.deleteMovie)

module.exports = router