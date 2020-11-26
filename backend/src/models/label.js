// Labels associated with projects
// Issues can have labels

const mongoose = require('mongoose')
const validator = require('validator')

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    color: {
        type: String,
        default: "Yellow"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Label = mongoose.model('Label', labelSchema)

module.exports = Label
