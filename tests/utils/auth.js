const request = require('supertest');
const { app } = require('../../src/app')


async function login() {
    const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

    return res.body.token;
}

async function signup() {
    const res = await request(app)
        .post('/signup')
        .send({ email: 'user', password: 'user123' })

    return res.body.token;
}

module.exports = { login, signup };