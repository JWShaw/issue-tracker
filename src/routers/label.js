const express = require('express')
const Label = require('../models/label')
const auth = require('../middleware/auth')
const validProject = require('../middleware/validProject')

const router = new express.Router()

// Create a new label for a project (for logged-in user)
router.post('/projects/:projId/labels', auth, validProject, async (req, res) => {
    const label = new Label({
        ...req.body, 
        owner: req.user._id,
        project: req.project._id
    })

    try {
        await label.save()
        res.status(201).send(label)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Fetch a specific label by its ID
router.get('/projects/:projId/labels/:labelId', validProject, async (req, res) => {
    const _id = req.params.labelId

    try {
        const label = await Label.findOne({
            _id,
            project: req.project._id
        })

        if (!label) {
            return res.status(404).send()
        }

        res.send(label)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get all labels for a project
router.get('/projects/:projId/labels', validProject, async (req, res) => {

    Label.find({ project: req.project._id }, null).then((labels) => {
        res.send(labels)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Update a label
router.patch('/projects/:projId/labels/:labelId', auth, validProject, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'color']
    const isValidOperation = updates.every((update) => 
        allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const label = await Label.findOne({
            _id: req.params.labelId,
            owner: req.user._id,
            project: req.project._id
        })

        if (!label) {
            return res.status(404).send()
        }

        updates.forEach((update) => label[update] = req.body[update])

        await label.save()
        res.send(label)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete a specific issue by its ID
router.delete('/projects/:projId/labels/:labelId', auth, validProject, async (req, res) => {
    try {
        const label = await Label.findOneAndDelete({
            _id: req.params.labelId,
            owner: req.user._id,
            project: req.project._id
        })

        if (!label) {
            return res.status(404).send()
        }

        res.send(label)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router