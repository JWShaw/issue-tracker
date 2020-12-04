const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const validIssue = require('../middleware/validIssue')

const router = new express.Router()

// Create a new comment (for logged-in user)
router.post('/projects/:projId/issues/:issueId/comments', auth, validIssue, async (req, res) => {
    const comment = new Comment({
        ...req.body, 
        owner: req.user._id,
        issue: req.issue._id
    })

    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Fetch a specific comment by its ID
router.get('/projects/:projId/issues/:issueId/comments/:commentId', validIssue, async (req, res) => {
    const _id = req.params.commentId

    try {
        const comment = await Comment.findOne({
            _id,
            issue: req.issue._id
        })

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Get all comments for an issue (with pagination)
// GET /projects/:projId/issues/:issueId/comments?limit=10&skip=20
// GET /projects/:projId/issues/:issueId/comments?sortBy=createdAt:asc
router.get('/projects/:projId/issues/:issueId/comments', validIssue, async (req, res) => {

    const options = {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: { "createdAt": 1 }
    }

    Comment.find({ issue: req.issue._id }, null, options).then((comments) => {
        res.send(comments)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Update a specific comment by its ID
router.patch('/projects/:projId/issues/:issueId/comments/:commentId', auth, validIssue, async (req, res) => {
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => 
        update === "text")

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const comment = await Comment.findOne({
            _id: req.params.commentId,
            owner: req.user._id,
            issue: req.issue._id
        })

        if (!comment) {
            return res.status(404).send()
        }

        comment.text = req.body.text

        await comment.save()
        res.send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

// Delete a specific issue by its ID
router.delete('/projects/:projId/issues/:issueId/comments/:commentId', auth, validIssue, async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({
            _id: req.params.commentId,
            owner: req.user._id,
            issue: req.issue._id
        })

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router