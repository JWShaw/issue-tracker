const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { 
    userOneId,
    userOne,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Test',
            email: 'test@test.ca',
            password: 'MyPass777!'
        })
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Test',
            email: 'test@test.ca'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should not allow user to register with invalid email', async () => {
    const userOneResponse = await request(app)
        .post('/users')
        .send({
            name : 'Test',
            email : 'invalidEmail',
            password : 'chicken'
        })
        .expect(400)
})

test('Should not allow user to register with invalid password', async () => {
    const userTwoResponse = await request(app)
        .post('/users')
        .send({
            name : 'Test',
            email : 'test@gmail.com',
            password : 'passwordOne'
        })
        .expect(400)
})

test('Should not allow user to update information without authentication', async () => {
    const userOneResponse = await request(app)
        .patch('/users/me')
        .send({
            name : 'Test',
            email : 'test@gmail.com'
        })
        .expect(401)
})

test('Should not allow user to delete account without authentication', async () => {
    const userDeleteResponse = await request(app)
        .delete('/users/me')
        .expect(401)
})

test('Should allow authenticated userOne to delete account', async () => {
    const userTwoRespone = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name : 'Test',
            email : 'test@gmail.com'
        })
        .expect(200)
})
    
test('Should allow authenticated userOne to delete his account', async () => {	
    const userTwoDeleteResponse = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})
