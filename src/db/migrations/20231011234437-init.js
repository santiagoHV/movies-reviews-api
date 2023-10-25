'use strict';

const { USER_TABLE, userSchema } = require('../models/user.model');
const { CATEGORY_TABLE, categorySchema } = require('../models/category.model');
const { MOVIE_TABLE, movieSchema } = require('../models/movie.model');
const { REVIEW_TABLE, reviewSchema } = require('../models/review.model');
const { MOVIE_CATEGORY_TABLE, movieCategorySchema } = require('../models/movie-category.model');
const { PREFERENCE_TABLE, preferenceSchema } = require('../models/preference.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        console.log('Running up migration ' + __filename)
        await queryInterface.createTable(USER_TABLE, userSchema)
        console.log('Created table ' + USER_TABLE)
        await queryInterface.createTable(CATEGORY_TABLE, categorySchema)
        console.log('Created table ' + CATEGORY_TABLE)
        await queryInterface.createTable(MOVIE_TABLE, movieSchema)
        console.log('Created table ' + MOVIE_TABLE)
        await queryInterface.createTable(MOVIE_CATEGORY_TABLE, movieCategorySchema)
        console.log('Created table ' + MOVIE_CATEGORY_TABLE)
        await queryInterface.createTable(PREFERENCE_TABLE, preferenceSchema)
        console.log('Created table ' + PREFERENCE_TABLE)
        await queryInterface.createTable(REVIEW_TABLE, reviewSchema)
        console.log('Created table ' + REVIEW_TABLE)
    },

    async down(queryInterface) {
        await queryInterface.dropTable(USER_TABLE)
        await queryInterface.dropTable(CATEGORY_TABLE)
        await queryInterface.dropTable(MOVIE_TABLE)
        await queryInterface.dropTable(MOVIE_CATEGORY_TABLE)
        await queryInterface.dropTable(PREFERENCE_TABLE)
        await queryInterface.dropTable(REVIEW_TABLE)
    }
};