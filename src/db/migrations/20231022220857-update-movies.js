'use strict';

const { USER_TABLE } = require('../models/user.model')
const { MOVIE_TABLE } = require('../models/movie.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(MOVIE_TABLE, 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    })

    await queryInterface.addConstraint(MOVIE_TABLE, {
      fields: ['creatorId'],
      type: 'foreign key',
      name: 'fk_user_id',
      references: {
        table: USER_TABLE,
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(MOVIE_TABLE, 'fk_user_id')
    await queryInterface.removeColumn(MOVIE_TABLE, 'creatorId')
  }
};
