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
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Reviews.belongsTo(Users, {
    foreignKey: 'userId',
})
Reviews.belongsTo(Movies, {
    foreignKey: 'movieId',
})

module.exports = Reviews