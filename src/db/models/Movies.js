const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');
const Reviews = require('./Reviews');

class Movies extends Model {
    async calculateRating() {

    }

    async getReviews() {
        const reviews = await Reviews.findAll({ where: { movieId: this.id } })
        return reviews
    }
}

Movies.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    title: Sequelize.STRING,
    director: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'Movies'
});

Movies.belongsTo(Users, {
    as: 'creator',
    foreignKey: 'creatorId',
})

Movies.hasMany(Reviews, { as: 'reviews' })

module.exports = Movies