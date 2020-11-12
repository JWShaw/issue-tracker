const mongoose = require('mongoose')

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
    }],
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

projectSchema.virtual('issues', {
    ref: 'Issue',
    localField: '_id',
    foreignField: 'project'
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project


//four levels of permission: 
    // * Owner/Top-level
    // * People who can mark issues as completed and change labels, etc
    // * End users who can just add issues/comments
    // * View-only

// Router: gives all labels for a project
// * give all issues for a project
// * give all the users for a project

// create a new issue
// create a new label

// add users to the project