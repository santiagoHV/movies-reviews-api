const jwt = require('jsonwebtoken')
const { User } = require('../db/models/user.model')
const { config } = require('../config/config')

const signIn = async(req, res, next) => {
    try {
        let { email, password } = req.body

        const userFound = await User.findOne({ where: { email } })
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

const signUp = async(req, res, next) => {
    try {
        let { email, lastname, name, password, role, birthdate } = req.body

        console.log('body:')
        console.log(req.body)
        const userFound = await User.findOne({ where: { email } })

        if (userFound) {
            return res.status(409).json({ message: 'Email already registered' })
        }

        const user = await User.create({
            name,
            email,
            lastname,
            password,
            birthdate: new Date(birthdate),
            role
        })

        console.log('user:')
        console.log(user)

        const token = jwt.sign({ id: user.id },
            config.jwtSecret, {
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