const request = require('supertest')
const sequelize = require('../../src/db/connection')
const { app } = require('../../src/app')


describe('Movies API', () => {
    describe('GET /movies', () => {

        beforeAll(async() => {
            await sequelize.sync({ force: true });
        });

        it('should return all movies', async() => {
            const response = await request(app).get('/api/movies')
            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(0)
        })
    })
})