
const request = require('supertest')
const app = require('../src/app')
const Project = require('../src/models/project')
const { 
    userOne, 
    projectOneId, 
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create a new project', async () => {
	// Creating project
	const projectResponse = await request(app)
		.post('/projects')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			title : 'Project 2',
			description : '2'
		})
		.expect(201)
	
	// Assertions about the response
	const project = await Project.findById(projectResponse.body._id)
	expect(project).not.toBeNull()
})

test('Should update a project', async () => {
	// Updating project
	const projectUpdateResponse = await request(app)
		.patch('/projects/' + projectOneId._id)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			title : 'Project 2 (updated)',
			description : 'Updated'
		})
        .expect(200)
})

test('Should delete a project', async () => {
	// Deleting project
	const projectDeleteResponse = await request(app)
		.delete('/projects/' + projectOneId._id)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.expect(200)
})	