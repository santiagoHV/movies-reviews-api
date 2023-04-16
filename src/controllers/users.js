const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Users = require('../db/models/Users')

router.post('/register', async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Users.create({ name, email, password });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
});

router.get('/me', async(req, res) => {
    try {
        const user = await Users.findByPk(req.user.id)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting user information' })
    }
});

module.exports = router