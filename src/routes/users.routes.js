const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const { verifyToken, validateIsAdmin } = require('../middlewares/authJwt')

router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUser)

router.get('/:email', usersController.getUser)

router.put('/:id', usersController.updateUser)

router.get('/search', usersController.searchUser)

router.get('/:name', [verifyToken, validateIsAdmin], usersController.searchUser)

router.get('/reviews/:userId', usersController.getReviews)

router.put('/create-admin/:id', [verifyToken, validateIsAdmin], usersController.createAdmin)

module.exports = router