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

module.exports = router