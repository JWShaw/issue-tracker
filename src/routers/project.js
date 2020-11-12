const express = require('express')
const Project = require('../models/project')
const auth = require('../middleware/auth')

const router = new express.Router()

// Create a new project (for logged-in user)
router.post('/projects', auth, async (req, res) => {
    const project = new Project({
        ...req.body, 
        owner: req.user._id
    })

    try {
        await project.save()
        res.status(201).send(project)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Need to be able to get issues by priority, label
// Don't need authorization
// Get issues by query string.  Currently only returns user's issues.
// GET /issues?completed=true
// GET /issues?limit=10&skip=10
// GET /issues?sortBy=createdAt:asc
router.get('/issues', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'issues',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.issues)
    } catch (e) {
        res.status(500).send()
    }
})

// Fetch a specific issue by its ID
router.get('/issues/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const issue = await Issue.findOne({ _id, owner: req.user._id })

        if (!issue) {
            return res.status(404).send()
        }

        res.send(issue)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update a specific issue by its ID
router.patch('/issues/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'completed']
    const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const issue = await Issue.findOne({ _id: req.params.id, owner: req.user._id })

        if (!issue) {
            return res.status(404).send()
        }

        updates.forEach((update) => issue[update] = req.body[update])

        await issue.save()
        res.send(issue)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete a specific issue by its ID
router.delete('/issues/:id', auth, async (req, res) => {
    try {
        const issue = await Issue.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!issue) {
            return res.status(404).send()
        }

        res.send(issue)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router