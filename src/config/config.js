const env = process.env.NODE_ENV || 'development'

const envs = {
    dev: '.env',
    test: '.env.test',
}

require('dotenv').config()