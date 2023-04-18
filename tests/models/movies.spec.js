const sequelize = require('../../src/db/connection')
const Movies = require('../../src/db/models/Movies')
    // require('../../setupTests')

describe('Movie model', () => {

    beforeAll(async() => {
        await sequelize.sync({ force: true });
    });

    describe('create', () => {
        it('should find an epmty array', async() => {
            const movies = await Movies.findAll()
            console.log(movies)
            expect(movies).toEqual([])
        })

        it('should create a new movie', async() => {
            const movie = await Movies.create({
                title: 'The Godfather',
                director: 'Francis Ford Coppola'
            })

            expect(movie.title).toBe('The Godfather')
            expect(movie.director).toBe('Francis Ford Coppola')
        })

        it('should find a movie by ID', async() => {
            const foundMovie = await Movies.findByPk(1)

            expect(foundMovie.title).toBe('The Godfather')
            expect(foundMovie.director).toBe('Francis Ford Coppola')
        });
    })
})