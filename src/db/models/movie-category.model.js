const { DataTypes, Model } = require('sequelize')
const { MOVIE_TABLE } = require('./movie.model')
const { CATEGORY_TABLE } = require('./category.model')

const MOVIE_CATEGORY_TABLE = 'movies_categories'

const movieCategorySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    movieId: {
        type: DataTypes.INTEGER,
        references: {
            model: MOVIE_TABLE,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        }
    },
}

class MovieCategory extends Model {
    static config(sequelize) {
        return {
            sequelize,
            modelName: 'MovieCategory',
            tableName: MOVIE_CATEGORY_TABLE,
            timestamps: true
        }
    }

}

module.exports = { MovieCategory, movieCategorySchema, MOVIE_CATEGORY_TABLE }