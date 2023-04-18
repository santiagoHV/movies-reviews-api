const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');
const Movies = require('./Movies');
class Reviews extends Model {
    // static associate(models) {
    //     Reviews.belongsTo(models.Users, {
    //         foreignKey: 'userId',
    //     })
    //     Reviews.belongsTo(models.Movies, {
    //         foreignKey: 'movieId',
    //     })
    // }

    async calculateRating() {}
}

Reviews.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
}, {
    sequelize,
    modelName: 'Reviews',
    tableName: 'reviews',
});

module.exports = Reviews