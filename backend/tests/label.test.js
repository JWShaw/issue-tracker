
const request = require('supertest')
const app = require('../src/app')
const Label = require('../src/models/label')
const { 
    userOne, 
    projectOneId, 
    labelOneId,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new label under projectOne', async () => {

    // Creating label
    const labelResponse = await request(app)
        .post('/projects/' + projectOneId + '/labels')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name : 'Label 2',
            color : 'Blue'
        })
        .expect(201)
    
    // Assertions about the response
    const label = await Label.findById(labelResponse.body._id)
    expect(label).not.toBeNull()
})	

test('Should update labelOne name and color', async () => {

    // Updating label
    const labelUpdateResponse = await request(app)
        .patch('/projects/' + projectOneId + '/labels/' + labelOneId) 
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name : 'Label 2 (Updated)',
            color : 'Violet'
        })
        .expect(200)
})

test('Should delete labelOne', async () => {
    // Deleting label
    const labelDeleteResponse = await request(app)
        .delete('/projects/' + projectOneId + '/labels/' + labelOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})
    