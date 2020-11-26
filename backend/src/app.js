const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const projectRouter = require('./routers/project')
const issueRouter = require('./routers/issue')
const commentRouter = require('./routers/comment')
const labelRouter = require('./routers/label')

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(issueRouter)
app.use(projectRouter)
app.use(commentRouter)
app.use(labelRouter)

module.exports = app

