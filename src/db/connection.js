const { Sequelize } = require('sequelize')
const setupModels = require('./models')
const { config } = require('../config/config')


console.log("config.db_url")
console.log(config.db_url)
console.log("postgres://user:password@localhost:5433/movie-review-api")

const options = {
    logging: true
}

// if (config.isProd) {
//     options.dialectOptions = {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// }

const sequelize = new Sequelize(config.db_url, options);

setupModels(sequelize);

module.exports = sequelize;