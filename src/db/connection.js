const { Sequelize } = require('sequelize')

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_TEST, NODE_ENV } = process.env

//TODO: Changes db separated variables for URI

const sequelize = new Sequelize(
    NODE_ENV === 'test' ? DB_TEST : DB_NAME,
    DB_USER,
    DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres',
        sync: true,
        logging: true
    }
);


module.exports = sequelize;