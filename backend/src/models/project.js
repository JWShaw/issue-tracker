const mongoose = require('mongoose')
const Issue = require('./issue')
const Label = require('./label')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    members: [{
        member: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            permission: {
                type: String,
                required: true
            }
        }
    }]
}, {
    timestamps: true
})

projectSchema.virtual('issues', {
    ref: 'Issue',
    localField: '_id',
    foreignField: 'project'
})

// Delete child issues and labels when project is removed
projectSchema.pre('findOneAndDelete', async function (next) {
    const proj = this
    await Issue.deleteMany({ project: proj._conditions._id })
    await Label.deleteMany({ project: proj._conditions._id })
    next()
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project


//four levels of permission: 
    // * Owner/Top-level
    // * People who can mark issues as completed and change labels, etc
    // * End users who can just add issues/comments
    // * View-only