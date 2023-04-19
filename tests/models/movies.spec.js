const sequelize = require('../../src/db/connection')
const Movies = require('../../src/db/models/Movies')
const Users = require('../../src/db/models/Users')

describe('Movie model', () => {

    let creator = null

    beforeAll(async() => {
        await sequelize.sync();

        creator = await Users.create({
            name: 'Francis Gutierrez',
            email: 'francis@gmail.com',
            password: '123456',
            role: 'admin'
        })
    })

    describe('create', () => {

        it('should create a new movie', async() => {
            const movie = await Movies.create({
                title: 'The Godfather',
                director: 'Francis Ford Coppola',
                creatorId: creator.id
            })

            expect(movie.title).toBe('The Godfather')
            expect(movie.director).toBe('Francis Ford Coppola')
        })

        it('should find a movie by ID', async() => {
            const foundMovie = await Movies.findByPk(1)

            expect(foundMovie.title).toBe('The Godfather')
            expect(foundMovie.director).toBe('Francis Ford Coppola')
        })

        it('should find a movie by title', async() => {
            const foundMovie = await Movies.findOne({ where: { title: 'The Godfather' } })

            expect(foundMovie.title).toBe('The Godfather')
            expect(foundMovie.director).toBe('Francis Ford Coppola')
        })

        it('movie created should have atribute published in false', async() => {
            const movie = await Movies.findByPk(1)
            expect(movie.published).toBe(false)
        })
    })

    describe('read', () => {
        it('should find an array with one movie', async() => {
            const movies = await Movies.findAll()
            expect(movies.length).toBe(1)
        })

        it('creator of the movie should be Francis Gutierrez', async() => {
            const movie = await Movies.findByPk(1, {
                include: {
                    model: Users,
                    as: 'Creator'
                }
            })

            console.log(movie)
            expect(movie.Creator.name).toBe('Francis Gutierrez')
        })
    })

    describe('update', () => {
        it('should update the movie', async() => {
            const movie = await Movies.create({
                title: 'The Godfather',
                director: 'Francis Ford Coppola'
            })

            const updatedMovie = await Movies.update({
                title: 'The Godfather II',
                director: 'Francis Ford Coppola'
            }, { where: { id: movie.id } })

            expect(updatedMovie[0]).toBe(1)
        })

        it('should publish the movie', async() => {
            const movie = await Movies.findByPk(1)
            movie.published = true
            await movie.save()

            expect(movie.published).toBe(true)
        })
    })

    describe('delete', () => {
        it('should delete the movie', async() => {
            const movie = await Movies.create({
                title: 'The Godfather',
                director: 'Francis Ford Coppola'
            })

            const deletedMovie = await Movies.destroy({ where: { id: movie.id } })

            expect(deletedMovie).toBe(1)
        })
    })
})