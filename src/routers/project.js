const express = require('express')
const Project = require('../models/project')
const auth = require('../middleware/auth')
const { update } = require('../models/project')

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

// Get a project by its id
router.get('/projects/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const project = await Project.findById(_id)

        if (!project) {
            return res.status(404).send()
        }

        res.send(project)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Update a project.  TODO: make it so permissioned users can perform this task
router.patch('/projects/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description']
    const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const project = await Project.findOne(
            { _id: req.params.id, owner: req.user._id })
        
            if (!project) {
                return res.status(404).send()
            }

            updates.forEach((update) => project[update] = req.body[update])

            await project.save()
            res.send(project)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router