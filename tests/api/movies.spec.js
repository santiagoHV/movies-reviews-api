const request = require('supertest')
const sequelize = require('../../src/db/connection')
const { app } = require('../../src/app')
const { describe } = require('../../src/db/models/Users')
const Movies = require('../../src/db/models/Movies')
const Users = require('../../src/db/models/Users')

describe('Movies API', () => {
    describe('GET /movies', () => {

        let user = null

        beforeAll(async() => {
            await sequelize.sync();

            user = await Users.create({
                name: 'Francis Gutierrez',
                email: 'francis@gmail.com',
                password: '123456',
                role: 'admin'
            })

        });

        afterAll(async() => {
            await Movies.destroy({ where: {} })
            await Users.destroy({ where: {} })
        })

        it('should return all movies', async() => {
            const response = await request(app).get('/api/movies')
            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(0)
        })

        it('should return a list of movies', async() => {
            const movie1 = await Movies.create({
                title: 'The Godfather',
                director: 'Francis Ford Coppola',
                creatorId: user.id
            })

            const movie2 = await Movies.create({
                title: 'The Godfather II',
                director: 'Francis Ford Coppola',
                creatorId: user.id
            })

            const response = await request(app).get('/api/movies')
            expect(response.status).toBe(200)
            expect(response.body).toHaveLength(2)
            expect(response.body).toEqual([movie1, movie2])
        })
    })

    describe('POST /api/movies', () => {
        test('should create a new movie', async() => {
            const newMovie = { title: 'Unglorious bastards', director: 'Quentin Tarantino' };
            const createdMovie = { title: 'Unglorious bastards', director: 'Quentin Tarantino', creatorId: user.id };

            const mockCreate = jest.spyOn(db.Movie, 'create').mockResolvedValue(createdMovie);

            const response = await request(app).post('/api/movies').send(newMovie);

            expect(mockCreate).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdMovie);
        })
    })
})