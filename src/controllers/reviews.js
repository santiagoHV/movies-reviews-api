//comentar / evaluar pelicula
// ver comentarios de un usuario
//ver comentarios de una pelicula
//borrar reviews

const createReview = async(req, res, next) => {
    try {
        const { movieId, content } = req.body
        const user = req.user
        const review = await Reviews.create({
            movieId,
            content,
            creatorId: user.id
        })
        res.status(201).json(review)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createReview,

}