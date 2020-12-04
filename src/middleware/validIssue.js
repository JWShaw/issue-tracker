const Issue = require('../models/issue')

const validIssue = async (req, res, next) => {
    const issue = await Issue.findById(req.params.issueId)
    if (!issue) {
        return res.status(404).send({ error: "Issue not found." })
    }
    req.issue = issue
    next()
}

module.exports = validIssue