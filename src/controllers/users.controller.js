const Users = require('../db/models/Users')

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
        id = req.body.userId
        const user = await Users.findByPk(id)
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

//revisar
const searchUser = async(req, res) => {
    const { name } = req.query
    const users = await Users.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    })

}


module.exports = {
    getAllUsers,
    getUserById,
    createAdmin,
    searchUser
}