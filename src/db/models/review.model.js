const { DataTypes, Model } = require('sequelize');

const REVIEW_TABLE = 'reviews';

const reviewSchema = {
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
}

class Review extends Model {
    static associate(models) {
        Review.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
        Review.belongsTo(models.Movie, {
            foreignKey: 'movieId',
            as: 'movie'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Review',
            tableName: REVIEW_TABLE,
            timestamps: true
        }
    }

    async calculateRating() {}
}


module.exports = { Review, reviewSchema, REVIEW_TABLE }