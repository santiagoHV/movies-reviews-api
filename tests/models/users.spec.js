const sequelize = require('../../src/db/connection')
const Movies = require('../../src/db/models/Movies')
const Users = require('../../src/db/models/Users')

describe('Users model', () => {

    beforeAll(async() => {
        await sequelize.sync()
    })

    describe('create', () => {
        it('should find an empty array', async() => {
            const users = await Users.findAll()
            expect(users).toEqual([])
        })

        it('should create a new user', async() => {
            const user = await Users.create({
                name: 'Alice Gutierrez',
                email: 'alice@gmail.com',
                password: '123456',
                role: 'user'
            })

            expect(user.name).toBe('Alice Gutierrez')
            expect(user.email).toBe('alice@gmail.com')
        })

        it('should create a new admin', async() => {
            const admin = await Users.create({
                name: 'Francis Gutierrez',
                email: 'admin@gmail.com',
                password: '123456',
                role: 'admin'
            })

            expect(admin.name).toBe('Francis Gutierrez')
            expect(admin.email).toBe('admin@gmail.com')
        })

        it('should find a user by email', async() => {
            const foundUser = await Users.findOne({ where: { email: 'admin@gmail.com' } })

            expect(foundUser.name).toBe('Francis Gutierrez')
        })
    })
})