const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');
const Movies = require('./Movies');

class Reviews extends Model {


    async calculateRating() {}
}

Reviews.init({
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
}, {
    sequelize,
    modelName: 'Reviews'
});

// Reviews.belongsTo(Users, {
//     foreignKey: 'userId',
//     as: 'user',
// })

// Reviews.belongsTo(Movies, {
//     foreignKey: 'movieId',
//     as: 'movie',
// })

module.exports = Reviews