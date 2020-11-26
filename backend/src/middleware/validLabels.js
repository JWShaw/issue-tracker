const Label = require('../models/label')

const validLabels = async (req, res, next) => {
    try {
        if (Object.keys(req.body).includes('labels')) {

            const updatesValidity = await Promise.all(req.body.labels.map((labelId) => {
                return Label.exists({ _id: labelId, project: req.project._id })
            }))

            if (updatesValidity.some(value => value == false)) {
                return res.status(400).send({ error: 'Invalid label!' })
            }
            next()
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = validLabels