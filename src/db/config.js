const { config } = require("./../config/config")

module.exports = {
    development: {
        url: config.db_url,
    },
    test: {
        url: config.db_url,
    },
    production: {
        url: config.db_url,
    },
}