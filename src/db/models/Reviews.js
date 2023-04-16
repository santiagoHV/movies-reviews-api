const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');
const Movies = require('./Movies');

const Reviews = sequelize.define('reviews', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    director: Sequelize.STRING,
});

Reviews.belongsTo(Users)
Reviews.belongsTo(Movies)

module.exports = Reviews