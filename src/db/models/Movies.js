const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../connection');
const Users = require('./Users');
const Reviews = require('./Reviews');

class Movies extends Model {

    async calculateRating() {
        const reviews = await this.getReviews()
        const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        return rating || 0
    }

    async getReviews() {
        const reviews = await Reviews.findAll({ where: { movieId: this.id } })
        return reviews
    }


}

Movies.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    title: DataTypes.STRING,
    director: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Movies',
    tableName: 'movies',
});


Users.hasMany(Movies, {
    foreignKey: 'creatorId',
})

Movies.belongsTo(Users, {
    foreignKey: 'creatorId',
    as: 'Creator'
})

Movies.hasMany(Reviews, {
    foreignKey: 'movieId',
})

Reviews.belongsTo(Movies, {
    foreignKey: 'movieId',
})

module.exports = Movies