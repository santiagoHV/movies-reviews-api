const { Review } = require('../db/models/review.model')
const { Movie } = require('../db/models/movie.model')

// ver comentarios de un usuario
//ver comentarios de una pelicula
//borrar reviews

const createReview = async(req, res, next) => {
    try {
        const { comment, rating } = req.body
        const { movieId } = req.params

        const user = req.user
        const movie = await Movie.findByPk(movieId)

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        }

        if (movie.published === false) {
            res.status(403).json({ message: 'Movie not published' })
        }

        const review = await Review.create({
            movieId: movie.id,
            comment,
            rating,
            userId: user.id
        })
        res.status(201).json(review)
    } catch (error) {
        next(error)
    }
}

const deleteReview = async(req, res, next) => {
    try {
        const { id } = req.params
        const review = await Review.findByPk(id)
        if (!review) {
            res.status(404).json({ message: 'Review not found' })
        } else {
            await review.destroy()
            res.status(206).json()
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}




module.exports = {
    createReview,
    deleteReview
}