const Project = require('../models/project')

const validProject = async (req, res, next) => {
    const project = await Project.findById(req.params.projId)
    if (!project) {
        return res.status(404).send({ error: "Project not found." })
    }
    req.project = project
    next()
}

module.exports = validProject