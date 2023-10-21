const bcrypt = require('bcryptjs');

const { Category, categorySchema } = require("./category.model");
const { Movie, movieSchema } = require("./movie.model");
const { User, userSchema } = require("./user.model");
const { MovieCategory, movieCategorySchema } = require("./movie-category.model");
const { Preference, preferenceSchema } = require("./preference.model");
const { Review, reviewSchema } = require("./review.model");

const setupModels = (sequelize) => {
    console.log('Setup models')
    User.init(userSchema, User.config(sequelize))
    Movie.init(movieSchema, Movie.config(sequelize))
    Category.init(categorySchema, Category.config(sequelize))
    Review.init(reviewSchema, Review.config(sequelize))
    MovieCategory.init(movieCategorySchema, MovieCategory.config(sequelize))
    Preference.init(preferenceSchema, Preference.config(sequelize))

    User.associate(sequelize.models)
    Category.associate(sequelize.models)
    Review.associate(sequelize.models)
    Movie.associate(sequelize.models)

    User.beforeCreate(async(user) => {
        console.log('before create')
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    })

}

module.exports = setupModels;