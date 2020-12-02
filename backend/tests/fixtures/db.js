const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Project = require('../../src/models/project')
const Issue = require('../../src/models/issue')
const Label = require('../../src/models/label')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Franklin',
    email: 'franklin@example.com',
    password: 'myhouse099!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const projectOneId = new mongoose.Types.ObjectId()
const projectOne = {
	_id: projectOneId,
	title: 'Project 1',
	description: '1',
	owner: userOneId
}

const issueOneId = new mongoose.Types.ObjectId()
const issueOne = {
	title: 'Issue 1',
	description: '1',
	completed: false,
	owner: userOneId,
	project: projectOneId
}

const labelOneId = new mongoose.Types.ObjectId()
const labelOne = {
	name: 'Label 1',
	color: 'Blue',
	project: projectOneId,
	owner: userOneId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
	await Project.deleteMany()
	await new Project(projectOne).save()
	await Issue.deleteMany()
	await new Issue(issueOne).save()
	await Label.deleteMany()
	await new Label(labelOne).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
	projectOneId,
	projectOne,
	issueOneId,
	issueOne,
	labelOneId,
	labelOne,
    setupDatabase
}