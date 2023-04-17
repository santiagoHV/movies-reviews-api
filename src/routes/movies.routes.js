const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies.controller')
const { verifyToken, canUpdateMovie } = require('../middlewares/authJwt')

router.get('/', moviesController.getAllMovies)

router.get('/:id', moviesController.getMovieById)

router.post('/', verifyToken, moviesController.createMovie)

router.put('/:id', [verifyToken, canUpdateMovie], moviesController.updateMovie)

router.delete('/:id', [verifyToken, canUpdateMovie], moviesController.deleteMovie)

module.exports = router