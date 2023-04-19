const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const { verifyToken, validateIsAdmin } = require('../middlewares/authJwt')

router.get('/', usersController.getAllUsers)

router.get('/:id', usersController.getUserById)

router.get('/search', usersController.searchUser)

router.get('/:name', [verifyToken, validateIsAdmin], usersController.searchUser)

router.get('/reviews/:userId', [verifyToken, validateIsAdmin], usersController.getReviews)

router.put('/create-admin/:id', [verifyToken, validateIsAdmin], usersController.createAdmin)

module.exports = router