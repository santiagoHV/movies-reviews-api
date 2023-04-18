const request = require('supertest');
const { app } = require('../../src/app')


async function login() {
    const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

    return res.body.token;
}

async function signup(token) {
    const res = await request(app)
        .post('/signup')
        .send({ email: 'user', password: 'user123' })
}

module.exports = { login, signup };