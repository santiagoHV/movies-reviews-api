const { config } = require("./../config/config")

module.exports = {
    development: {
        url: config.db_url,
    },
}