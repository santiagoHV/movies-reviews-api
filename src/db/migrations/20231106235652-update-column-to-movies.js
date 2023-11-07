'use strict';
const { MOVIE_TABLE } = require('../models/movie.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn(MOVIE_TABLE, 'clasifitation', 'clasification')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameColumn(MOVIE_TABLE, 'clasification', 'clasifitation')
    }
};