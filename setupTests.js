const { app } = require('./src/app')
const { sequelize } = require('./src/db/connection')

let server;

beforeAll(async() => {
    await sequelize.sync({ force: true });
    server = await app.listen(3000);
});

afterAll(async() => {
    await sequelize.close();
    await server.close();
});

module.exports = {
    app,
    sequelize,
};