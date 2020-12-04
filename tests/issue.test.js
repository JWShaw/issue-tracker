
const request = require('supertest')
const app = require('../src/app')
const Issue = require('../src/models/issue')
const { 
    userOne, 
    projectOneId, 
    issueOneId, 
    labelOneId,
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new issue', async () => {
    // Creating issue
    const issueResponse = await request(app)
        .post('/projects/' + projectOneId + '/issues')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            title : 'Issue 2',
            description : '2'
        })
        .expect(201)
    
    // Assertions about the response
    const issue = await Issue.findById(issueResponse.body._id)
    expect(issue).not.toBeNull()
})

test('Should update an issue', async () => {
    // Updating issue
    const issueUpdateResponse = await request(app)
        .patch('/projects/' + projectOneId + '/issues/' + issueOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed : true,
            title : 'Issue 2 (updated)',
            description : 'Updated',
            labels : [labelOneId]
        })
        .expect(200)
        
        const issue = await Issue.findById(issueOneId)
        expect(issue.description).toBe('Updated')
})

test('Should delete an issue', async () =>  {
    // Deleting issue
    const issueDeleteResponse = await request(app)
        .delete('/projects/' + projectOneId + '/issues/' + issueOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})