const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');

const Movies = sequelize.define('movies', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    director: Sequelize.STRING,
});

Movies.belongsTo(Users, { as: 'creator' })

module.exports = Movies