const Users = require('../db/models/user.model')

const getAllUsers = async(req, res) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getUserById = async(req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findByPk(id)
        console.log(user.reviews)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        next(err)
    }
}

const createAdmin = async(req, res) => {
    try {
        id = req.params.id
        const user = await Users.findByPk(id)
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
    try {
        const { userId } = req.params
        const user = await Users.findByPk(userId)
        if (!user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            const reviews = await user.getReviews()
            res.status(200).json(reviews)
        }
    } catch (err) {
        next(err)
    }
}

const searchUser = async(req, res) => {
    try {
        const name = req.params.name;

        const users = await Users.findAll({
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


module.exports = {
    getAllUsers,
    getUserById,
    createAdmin,
    searchUser,
    getReviews
}