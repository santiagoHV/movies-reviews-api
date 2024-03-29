const {User} = require('../db/models/user.model')
const {Movie} = require('../db/models/movie.model')
const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).json({ message: 'No token provided' })

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decodedToken.id)

        if (!user) {
            return res.status(401).json({
                message: 'Invalid token'
            })
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

const validateIsAdmin = (req, res, next) => {
    if (isAdmin(req.user.role)) {
        next()
    } else {
        return res.status(403).json({ message: 'Forbidden - You need to be admin' })
    }
}

const canUpdateMovie = async(req, res, next) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) return res.status(404).json({ message: 'Movie not found' })

    if (movie.creatorId === req.user.id) {
        next()
    } else if (isAdmin(req.user.role)) {
        next()
    } else {
        return res.status(403).json({ message: 'Forbidden' })
    }
}

const isAdmin = (role) => role === 'admin'

module.exports = {
    verifyToken,
    validateIsAdmin,
    canUpdateMovie
}