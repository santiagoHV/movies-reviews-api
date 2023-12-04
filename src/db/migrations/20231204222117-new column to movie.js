'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add new column to movie, must be called status and must be a string limited for 4 options: "approved", "rejected", "pending", "deleted"
    await queryInterface.addColumn('movies', 'status', {
      type: Sequelize.ENUM('approved', 'rejected', 'pending', 'deleted'),
      defaultValue: 'pending',
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('movies', 'status')
  }
};
