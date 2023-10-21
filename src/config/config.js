require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    db_url: process.env.DB_URL,
}

module.exports = { config }