const { Movie } = require('../db/models/movie.model')
const { Review } = require('../db/models/review.model')
const { User } = require('../db/models/user.model')
const { Category } = require('../db/models/category.model')
const { models } = require('../db/connection')
const { Op, Sequelize } = require('sequelize')

const createMovie = async(req, res, next) => {
    try {
        const {
            title,
            director,
            description,
            year,
            image,
            clasification,
            categories
        } = req.body
        const user = req.user

        const movie = await Movie.create({
            title,
            director,
            description,
            year,
            image,
            clasification,
            creatorId: user.id
        })

        await movie.addCategories(categories)

        res.status(201).json({
            message: 'Movie created for approval',
            movie
        })
    } catch (error) {
        next(error)
    }
}

const publishMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movie.findByPk(id)
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
        const movie = await Movie.findByPk(id)
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
        const { page, pageSize } = req.query;
        const searchQuery = req.query.search || ''
        let limit, offset, movies

        if (page && pageSize) {
            limit = parseInt(pageSize)
            offset = (parseInt(page) - 1) * limit

            movies = await Movie.findAndCountAll({
                offset,
                limit,
                where: {
                    [Op.and]: [
                        { published: true },
                        Sequelize.where(
                            Sequelize.fn('LOWER', Sequelize.col('title')),
                            'LIKE',
                            `%${searchQuery.toLowerCase()}%`
                        )
                    ]
                }
            })

            movies = movies.rows
        } else {
            movies = await Movie.findAll({
                where: {
                    [Op.and]: [
                        { published: true },
                        Sequelize.where(
                            Sequelize.fn('LOWER', Sequelize.col('title')),
                            'LIKE',
                            `%${searchQuery.toLowerCase()}%`
                        )
                    ]
                },
                include: [{
                        model: User,
                        as: 'creator',
                        attributes: ['name', 'lastname', 'email']
                    },
                    {
                        model: Category,
                        as: 'categories',
                        attributes: ['name', 'description'],
                    }
                ],
            })
        }


        const moviesWithRating = await Promise.all(movies.map(async(movie) => {
            const rating = await movie.calculateRating()
            return {...movie.dataValues, rating }
        }))
        res.status(200).json(moviesWithRating)
    } catch (error) {
        next(error)
    }
}

const getUnpublishedMovies = async(req, res, next) => {
    try {
        const movies = await Movie.findAll({ 
            where: { published: false },
            include: [{
                model: User,
                as: 'creator',
                attributes: ['name', 'lastname', 'email']
            },
            {
                model: Category,
                as: 'categories',
                attributes: ['name', 'description'],
            }]
        })
        res.status(200).json(movies)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getMovieById = async(req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movie.findByPk(id, {
                attributes: ['id', 'title', 'director', 'description', 'year', 'image', 'clasification', 'published'],
                include: [{
                        model: User,
                        as: 'creator',
                        attributes: ['name', 'lastname', 'email']
                    },
                    {
                        model: Review,
                        as: 'reviews',
                        attributes: ['id', 'comment', 'rating', 'createdAt'],
                        include: [{
                            model: User,
                            as: 'user',
                            attributes: ['name', 'lastname', 'email', 'id']
                        }]
                    },
                    {
                        model: Category,
                        as: 'categories',
                        attributes: ['name', 'description'],
                    }
                ],
            })

            const rating = await movie.calculateRating()

            const jsonMovie = {...movie.dataValues, rating }

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            res.status(200).json(jsonMovie)
        }
    } catch (err) {
        next(err)
    }
}

const updateMovie = async(req, res, next) => {
    try {
        const { id } = req.params
        const {
            title,
            director,
            description,
            year,
            image,
            clasification,
            categories
        } = req.body

        const movie = await Movie.findByPk(id)
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        } else {
            await movie.update({
                title,
                director,
                description,
                year,
                image,
                clasification,
                published: false
            })

            await movie.setCategories(categories)
            res.status(200).json(movie)
        }
    } catch (err) {
        console.log(err)
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
    updateMovie,
    getUnpublishedMovies,
    publishMovie,
    unpublishMovie
}