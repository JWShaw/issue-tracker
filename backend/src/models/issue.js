const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
}, {
    timestamps: true
})

issueSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'issue'
})

const Issue = mongoose.model('Issue', issueSchema)

module.exports = Issue