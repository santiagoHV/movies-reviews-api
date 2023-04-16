const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/movies.controller')

router.get('/', moviesController.getAllMovies)

router.get('/:id', moviesController.getMovieById)

router.post('/', moviesController.createMovie)

router.put('/:id', moviesController.updateMovie)

router.delete('/:id', moviesController.deleteMovie)


module.exports = router