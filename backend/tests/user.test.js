const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Project = require('../src/models/project')
const Issue = require('../src/models/issue')
const Comment = require('../src/models/comment')
const Label = require('../src/models/label')
const { userOneId, userOne, userTwoId, userTwo, projectOneId, projectOne, issueOneId, issueOne, labelOneId, labelOne, setupDatabase } = require('./fixtures/db')

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

test('Test creation, updating, deletion of project', async () => {
	const userResponse = await request(app)
		.post('/users/login')
		.send({
			email: 'mike@example.com',
			password: '56what!!'
		})
		.expect(200)
	
	const user = await User.findById(userResponse.body.user._id)
    expect(user).not.toBeNull()
	
    // Assertions about the response
    expect(userResponse.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[1].token
    })
	
	// Creating project
	const projectResponse = await request(app)
		.post('/projects')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'title' : 'Project 2',
			'description' : '2'
		})
		.expect(201)
	
	// Assertions about the response
	const project = await Project.findById(projectResponse.body._id)
	expect(project).not.toBeNull()
	
	// Updating project
	const projectUpdateResponse = await request(app)
		.patch('/projects/' + project._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'title' : 'Project 2 (updated)',
			'description' : 'Updated'
		})
		.expect(200)
	
	// Deleting project
	const projectDeleteResponse = await request(app)
		.delete('/projects/' + project._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.expect(200)
	
})

test('Test creation, updating, deletion of issue', async () => {
	const userResponse = await request(app)
		.post('/users/login')
		.send({
			email: 'mike@example.com',
			password: '56what!!'
		})
		.expect(200)
	
	const user = await User.findById(userResponse.body.user._id)
    expect(user).not.toBeNull()
	
    // Assertions about the response
    expect(userResponse.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[1].token
    })
	
	// Creating issue
	console.log(projectOneId)
	const issueResponse = await request(app)
		.post('/projects/' + projectOneId + '/issues')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'title' : 'Issue 2',
			'description' : '2'
		})
		//.expect(201)
	
	console.log(issueResponse.error)
	// Assertions about the response
	const issue = await Issue.findById(issueResponse.body._id)
	expect(issue).not.toBeNull()
	
	// Updating issue
	const issueUpdateResponse = await request(app)
		.patch('/projects/' + projectOneId + '/issues/' + issue._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'completed' : true,
			'title' : 'Issue 2 (updated)',
			'description' : 'Updated',
			'labels' : [labelOneId]
		})
		.expect(200)
	
	// Deleting issue
	const issueDeleteResponse = await request(app)
		.delete('/projects/' + projectOneId + '/issues/' + issue._ud)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.expect(200)
	
})

test('Test creation, updating, deletion of comment', async () => {
	const userResponse = await request(app)
		.post('/users/login')
		.send({
			email: 'mike@example.com',
			password: '56what!!'
		})
		.expect(200)
	
	const user = await User.findById(userResponse.body.user._id)
    expect(user).not.toBeNull()
	
    // Assertions about the response
    expect(userResponse.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[1].token
    })
	
	// Creating comment
	const commentResponse = await request(app)
		.post('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'text' : 'First comment'
		})
		.expect(201)
	
	// Assertions about the response
	const comment = await Comment.findById(commentResponse.body._id)
	expect(comment).not.toBeNull()
	
	// Updating comment
	const commentUpdateResponse = await request(app)
		.patch('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments/' + comment._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'text' : 'Updated first comment'
		})
		.expect(200)
	
	// Deleting comment
	const commentDeleteResponse = await request(app)
		.delete('/projects/' + projectOneId + '/issues/' + issueOneId + '/comments/' + comment._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.expect(200)
	
})

test('Test creation, updating, deletion of label', async () => {
	const userResponse = await request(app)
		.post('/users/login')
		.send({
			email: 'mike@example.com',
			password: '56what!!'
		})
		.expect(200)
	
	const user = await User.findById(userResponse.body.user._id)
    expect(user).not.toBeNull()
	
    // Assertions about the response
    expect(userResponse.body).toMatchObject({
        user: {
            name: 'Mike',
            email: 'mike@example.com'
        },
        token: user.tokens[1].token
    })
	
	// Creating label
	const labelResponse = await request(app)
		.post('/projects/' + projectOneId + '/labels')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'name' : 'Label 2',
			'color' : 'Blue'
		})
		.expect(201)
	
	// Assertions about the response
	const label = await Label.findById(labelResponse.body._id)
	expect(label).not.toBeNull()
	
	// Updating label
	const labelUpdateResponse = await request(app)
		.patch('/projects/' + projectOneId + '/labels/' + label._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'name' : 'Label 2 (Updated)',
			'color' : 'Violet'
		})
		.expect(200)
	
	// Deleting label
	const labelDeleteResponse = await request(app)
		.delete('/projects/' + projectOneId + '/labels/' + label._id)
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.expect(200)
})

test('Test registration of new user with invalid password/email', async () => {
	const userOneResponse = await request(app)
		.post('/users')
		.send({
			'name' : 'Test',
			'email' : 'invalidEmail',
			'password' : 'chicken'
		})
		.expect(400)
	
	const userTwoResponse = await request(app)
		.post('/users')
		.send({
			'name' : 'Test',
			'email' : 'test@gmail.com',
			'password' : 'passwordOne'
		})
		.expect(400)
})

test('Test updating of user with/without authentication', async () => {
	const userOneResponse = await request(app)
		.patch('/users/me')
		.send({
			'name' : 'Test',
			'email' : 'test@gmail.com'
		})
		.expect(401)
	
	const userDeleteResponse = await request(app)
		.delete('/users/me')
		.expect(401)
	
	const userResponse = await request(app)
		.post('/users/login')
		.send({
			email: 'mike@example.com',
			password: '56what!!'
		})
		.expect(200)
	
	const user = await User.findById(userResponse.body.user._id)
    expect(user).not.toBeNull()
	
	const userTwoRespone = await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.send({
			'name' : 'Test',
			'email' : 'test@gmail.com'
		})
		.expect(200)
	
	const userTwoDeleteResponse = await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${user.tokens[0].token}`)
		.expect(200)
	
})

/*test('Test project', async () => {
	const projectResponse = await request(app)
		.get('/projects/' + projectOneId)
		.expect
	
})
*/


//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated