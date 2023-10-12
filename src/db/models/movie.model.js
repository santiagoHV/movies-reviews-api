const { DataTypes, Model } = require('sequelize');
const { Review } = require('./review.model');

const MOVIE_TABLE = 'movies';

const movieSchema = {
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
    description: DataTypes.STRING,
    year: DataTypes.INTEGER,
    clasifitation: DataTypes.ENUM(['G', 'PG', 'PG-13', 'R', 'NC-17']),
}

class Movie extends Model {

    static associate(models) {
        Movie.hasMany(models.Review, {
            foreignKey: 'movieId',
            as: 'review'
        })

        Movie.belongsToMany(models.Category, {
            through: models.MovieCategory,
            foreignKey: 'movieId',
            otherKey: 'categoryId',
            as: 'categories'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Movie',
            tableName: MOVIE_TABLE,
            timestamps: true
        }
    }

    async calculateRating() {
        const reviews = await this.getReviews()
        const rating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        return rating || 0
    }

    async getReviews() {
        const reviews = await Review.findAll({ where: { movieId: this.id } })
        return reviews
    }
}

module.exports = { Movie, movieSchema, MOVIE_TABLE }