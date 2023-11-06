const { Category } = require('../db/models/category.model');

const createCategory = async(req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategory = async(req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategories = async(req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCategory = async(req, res) => {
    try {
        const category = await Category.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory
}