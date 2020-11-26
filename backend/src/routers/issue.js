const express = require('express')
const Issue = require('../models/issue')
const auth = require('../middleware/auth')
const validProject = require('../middleware/validProject')

const router = new express.Router()

// Create a new issue (for logged-in user)
router.post('/projects/:projId/issues/', auth, validProject, async (req, res) => {

    const issue = new Issue({
        ...req.body, 
        owner: req.user._id,
        project: req.project._id 
    })

    try {
        await issue.save()
        res.status(201).send(issue)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all projects (with sorting and pagination)
// GET /projects/:projId/issues?limit=10&skip=20
// GET /projects/:projId/issues?sortBy=createdAt:asc
// GET /projects/:projId/issues?sortBy=createdAt:desc
router.get('/projects/:projId/issues', validProject, async (req, res) => {

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
    }

    const sort = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        options.sort = sort
    }

    Issue.find({ project: req.project._id }, null, options).then((issues) => {
        res.send(issues)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Fetch a specific issue by its ID
router.get('/projects/:projId/issues/:issueId', validProject, async (req, res) => {
    const _id = req.params.issueId

    try {
        const issue = await Issue.findOne({ _id, project: req.project._id })

        if (!issue) {
            return res.status(404).send()
        }

        res.send(issue)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update a specific issue by its ID
router.patch('/projects/:projId/issues/:issueId', auth, validProject, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'completed']
    const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const issue = await Issue.findOne({
            _id: req.params.issueId,
            owner: req.user._id,
            project: req.project._id
        })

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
router.delete('/projects/:projId/issues/:issueId', auth, validProject, async (req, res) => {
    try {
        const issue = await Issue.findOneAndDelete({
            _id: req.params.issueId,
            owner: req.user._id,
            project: req.project._id
        })

        if (!issue) {
            return res.status(404).send()
        }

        res.send(issue)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router