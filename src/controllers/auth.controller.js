const jwt = require('jsonwebtoken')
const Users = require('../db/models/Users')

const signIn = async(req, res, next) => {
    try {
        let { email, password } = req.body

        const userFound = await Users.findOne({ where: { email } })
        if (!userFound) return res.status(400).json({ message: 'User not found' })

        const passwordMatch = await userFound.comparePassword(password)
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid password' })

        const token = jwt.sign({ id: userFound.id },
            process.env.JWT_SECRET, {
                expiresIn: 86400 //24 hours
            })

        res.status(201).json({ email, token })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

//TODO: just admin can create admin
const signUp = async(req, res, next) => {
    try {
        let { email, name, password, role } = req.body
        if (!role) {
            role = 'user'
        }

        const userFound = await Users.findOne({ where: { email } })

        if (userFound) {
            return res.status(409).json({ message: 'Email already registered' })
        }

        const user = await Users.create({
            name,
            email,
            password,
            role
        })

        const token = jwt.sign({ id: user.id },
            process.env.JWT_SECRET, {
                expiresIn: 86400 //24 hours
            })

        res.status(200).json({
            email: user.email,
            message: 'User created!',
            token
        })
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports = {
    signIn,
    signUp
}