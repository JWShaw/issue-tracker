const request = require('supertest')
const app = require('../src/app')
const Comment = require('../src/models/comment')
const {
    userOne,
    projectOneId,
    issueOneId,
    commentOneId,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new comment under issueOne', async () => {
    // Creating comment
    const commentResponse = await request(app)
        .post('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            text: 'First comment'
        })
        .expect(201)

    // Assertions about the response
    const comment = await Comment.findById(commentResponse.body._id)
    expect(comment).not.toBeNull()
})

test('Should update commentOne', async () => {
    // Updating comment
    const commentUpdateResponse = await request(app)
        .patch('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments/' + commentOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            text: 'Updated first comment'
        })
        .expect(200)
})

test('Should delete commentOne', async () => {
    // Deleting comment
    const commentDeleteResponse = await request(app)
        .delete('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments/' + commentOneId)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})