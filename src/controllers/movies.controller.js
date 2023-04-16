const Movies = require('../db/models/Movies')

const createMovie = async(req, res, next) => {
    try {
        const movie = await Movies.create(req.body)
        res.status(201).json(movie)
    } catch (error) {
        next(error)
    }
}

const getAllMovies = async(req, res, next) => {
    try {
        const movies = await Movies.findAll()
        console.log('MOVIES ' + movies)
        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
}

const getMovieById = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movies.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            res.status(200).json(movie)
        }
    } catch (err) {
        next(err)
    }
}

const updateMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const { title, director, year } = req.body
        const movie = await Movies.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.update({ title, director, year })
            res.status(200).json(movie)
        }
    } catch (err) {
        next(err);
    }
}

const deleteMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movie.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.destroy()
            res.status(204).end()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    deleteMovie,
    updateMovie
}