require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL,
}

module.exports = { config }