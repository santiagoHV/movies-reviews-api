require('dotenv').config()

console.log(process.env.DB_URL)

module.exports = {
    development: {
        url: 'postgres://user:password@localhost:5433/movie-review-api',
    },
}