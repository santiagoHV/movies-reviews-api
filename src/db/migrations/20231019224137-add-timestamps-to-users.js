'use strict';

const { USER_TABLE, userSchema } = require('../models/user.model');
const { CATEGORY_TABLE, categorySchema } = require('../models/category.model');
const { MOVIE_TABLE, movieSchema } = require('../models/movie.model');
const { MOVIE_CATEGORY_TABLE, movieCategorySchema } = require('../models/movie-category.model');
const { PREFERENCE_TABLE, preferenceSchema } = require('../models/preference.model');
const { REVIEW_TABLE, reviewSchema } = require('../models/review.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(MOVIE_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(MOVIE_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(USER_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(USER_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(CATEGORY_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(CATEGORY_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(MOVIE_CATEGORY_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(MOVIE_CATEGORY_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(PREFERENCE_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(PREFERENCE_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(REVIEW_TABLE, 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
        await queryInterface.addColumn(REVIEW_TABLE, 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn(MOVIE_TABLE, 'createdAt')
        await queryInterface.removeColumn(MOVIE_TABLE, 'updatedAt')
        await queryInterface.removeColumn(USER_TABLE, 'createdAt')
        await queryInterface.removeColumn(USER_TABLE, 'updatedAt')
        await queryInterface.removeColumn(CATEGORY_TABLE, 'createdAt')
        await queryInterface.removeColumn(CATEGORY_TABLE, 'updatedAt')
        await queryInterface.removeColumn(MOVIE_CATEGORY_TABLE, 'createdAt')
        await queryInterface.removeColumn(MOVIE_CATEGORY_TABLE, 'updatedAt')
        await queryInterface.removeColumn(PREFERENCE_TABLE, 'createdAt')
        await queryInterface.removeColumn(PREFERENCE_TABLE, 'updatedAt')
        await queryInterface.removeColumn(REVIEW_TABLE, 'createdAt')
        await queryInterface.removeColumn(REVIEW_TABLE, 'updatedAt')
    }
};