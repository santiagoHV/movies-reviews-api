const Movies = require('../db/models/Movies')
const Users = require('../db/models/Users')

//TODO: crear endpoint de solicitud de creacion, lista de solicitudes y aprovar o rechazar solicitud
const createMovie = async(req, res, next) => {
    try {
        const { title, director } = req.body
        const user = req.user
        const movie = await Movies.create({
            title,
            director,
            creatorId: user.id
        })
        res.status(201).json(movie)
    } catch (error) {
        next(error)
    }
}

const getUnpublishedMovies = async(req, res, next) => {
    try {
        const movies = await Movies.findAll({ where: { published: false } })
        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
}

const publishMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movies.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.update({ published: true })
            res.status(200).json(movie)
        }
    } catch (err) {
        next(err);
    }
}

const unpublishMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movies.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.update({ published: false })
            res.status(200).json(movie)
        }
    } catch (err) {
        next(err);
    }
}

//TODO: add calificacion promedio, paginacion y filtrado
const getAllMovies = async(req, res, next) => {
    try {
        const movies = await Movies.findAll({ where: { published: true } })
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
        const { title, director } = req.body
        const movie = await Movies.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.update({ title, director })
            res.status(200).json(movie)
        }
    } catch (err) {
        next(err);
    }
}

const deleteMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movies.findByPk(id)

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.destroy()
            res.status(204).send()
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    deleteMovie,
    updateMovie
}