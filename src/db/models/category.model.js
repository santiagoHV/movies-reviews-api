const { DataTypes, Model } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const categorySchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
}

class Category extends Model {

    static associate(models) {
        Category.belongsToMany(models.Movie, {
            through: models.MovieCategory,
            foreignKey: 'categoryId',
            otherKey: 'movieId',
            as: 'movies'
        })

        Category.belongsToMany(models.User, {
            through: models.Preference,
            foreignKey: 'categoryId',
            otherKey: 'userId',
            as: 'users'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Category',
            tableName: CATEGORY_TABLE,
            timestamps: true
        }
    }
}

module.exports = { Category, categorySchema, CATEGORY_TABLE }