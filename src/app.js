const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./db/connection');
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(require('./routes'))

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate()
        console.log('Database connection OK!')
    } catch (error) {
        console.log('Unable to connect to the database:')
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();

    console.log(`Starting Sequelize + Express example on port ${port}...`)

    app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = { app, init }