const { Sequelize } = require('sequelize')
const setupModels = require('./models')

const { DB_URL, NODE_ENV } = process.env

const options = {
    logging: NODE_ENV === 'development' ? console.log : false
}

// if (config.isProd) {
//     options.dialectOptions = {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
// }

const sequelize = new Sequelize('postgres://user:password@localhost:5433/movie-review-api', options);

setupModels(sequelize);

module.exports = sequelize;