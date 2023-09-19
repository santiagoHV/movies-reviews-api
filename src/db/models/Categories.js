const { Sequelize, DataTypes, Model } = require('sequelize');
const Movies = require('./Movies');
const Users = require('./Users');

class Categories extends Model {

}

Categories.init({
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
}, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories',
});

Categories.belongsToMany(Movies, {
    through: 'movies_categories',
    foreignKey: 'categoryId',
    as: 'movies'
})

Categories.belongsToMany(Users, {
    through: 'preferences',
    foreignKey: 'categoryId',
    as: 'users'
})

Users.belongsToMany(Categories, {
    through: 'preferences',
    foreignKey: 'userId',
    as: 'preferences'
})

Movies.belongsToMany(Categories, {
    through: 'movies_categories',
    foreignKey: 'movieId',
    as: 'categories'
})