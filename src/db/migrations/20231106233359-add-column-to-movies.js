'use strict';

const { MOVIE_TABLE } = require("../models/movie.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(MOVIE_TABLE, 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn(MOVIE_TABLE, 'image')
    }
};