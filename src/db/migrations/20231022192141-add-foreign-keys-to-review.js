'use strict';

const { REVIEW_TABLE } = require('../models/review.model')
const { USER_TABLE } = require('../models/user.model')
const { MOVIE_TABLE } = require('../models/movie.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(REVIEW_TABLE, 'userId', {
      type: Sequelize.INTEGER, 
      allowNull: false, 
    })

    await queryInterface.addColumn(REVIEW_TABLE, 'movieId', {
      type: Sequelize.INTEGER, 
      allowNull: false, 
    });

    await queryInterface.addConstraint(REVIEW_TABLE, {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: USER_TABLE,
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint(REVIEW_TABLE, {
      fields: ['movieId'],
      type: 'foreign key',
      name: 'fk_movie_id',
      references: {
        table: MOVIE_TABLE,
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(REVIEW_TABLE, 'userId')
    await queryInterface.removeColumn(REVIEW_TABLE, 'movieId')

    await queryInterface.removeConstraint(REVIEW_TABLE, 'fk_user_id')
    await queryInterface.removeConstraint(REVIEW_TABLE, 'fk_movie_id')
  }
};
