const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categories.controller')

router.get('/', categoriesController.getCategories)
router.post('/', categoriesController.createCategory)
router.get('/:id', categoriesController.getCategory)
router.put('/:id', categoriesController.updateCategory)

module.exports = router