const Users = require('../db/models/Users')

const checkDuplicateEmail = async(req, res, next) => {
    const user = await Users.findOne({ where: { email: req.body.email } })

    if (user) return res.status(400).json({ message: 'The user already exists' })

    next()
}