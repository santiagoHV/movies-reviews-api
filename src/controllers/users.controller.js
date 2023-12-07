const { Category } = require('../db/models/category.model')
const { User } = require('../db/models/user.model')
const { Review } = require('../db/models/review.model')
const { Movie } = require('../db/models/movie.model')

const getAllUsers = async(req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getUser = async(req, res) => {
    try {
        const { id, email } = req.params
        if (id) {
            const user = await User.findByPk(id, {
                include: [{
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name'],
                }]
            })
            if (!user) {
                res.status(404).json({ message: 'User not found' })
            } else {
                res.status(200).json(user)
            }
        } else if (email) {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                res.status(404).json({ message: 'User not found' })
            } else {
                res.status(200).json(user)
            }
        }
    } catch (err) {
        next(err)
    }
}

const updateUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await user.update(req.body)
            res.status(200).json(user)
        }
    } catch (err) {
        next(err)
    }
}

const createAdmin = async(req, res) => {
    try {
        id = req.params.id
        const user = await User.findByPk(id)
        await user.becomeAdmin()
        user.save()

        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await user.becomeAdmin()
            res.status(200).json(user)
        }
    } catch (err) {
        console.log(err)
    }
}

const getReviews = async(req, res) => {
    // try {
    const { userId } = req.params
    const user = await User.findByPk(userId, {
        include: {
            model: Review,
            as: 'review',
            attributes: ['rating', 'comment'],
            include: {
                model: Movie,
                as: 'movie',
                attributes: ['title', 'id']
            }
        }
    })
    if (!user) {
        res.status(404).json({ message: 'User not found' })
    } else {
        res.status(200).json(user)
    }
    // } catch (err) {
    //     next(err)
    // }
}

const searchUser = async(req, res) => {
    try {
        const name = req.params.name;

        const users = await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addPreferences = async(req, res) => {
    try {
        const id = req.user.id
        const { preferences } = req.body
        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await user.addCategories(preferences)
            res.status(200).json(user)
        }
    } catch (err) {
        next(err)
    }
}

const updatePreferences = async(req, res) => {
    try {
        console.log('entro')
        const id = req.user.id
        const { preferences } = req.body
        const user = await User.findByPk(id)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await user.setCategories(preferences)
            res.status(200).json(user)
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    createAdmin,
    searchUser,
    getReviews,
    addPreferences,
    updatePreferences
}