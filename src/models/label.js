// Labels associated with projects
// Issues can have labels
const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    color: {
        type: String,
        default: "Yellow",
        validate(value) {
            const acceptedColors = ["Red", "Yellow", "Green", "Blue", "Violet"]
            if (!(acceptedColors.includes(value))) {
                throw new Error('Color invalid!')
            }
        }
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Label = mongoose.model('Label', labelSchema)

module.exports = Label
