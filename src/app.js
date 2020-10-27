const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const issueRouter = require('./routers/issue')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(issueRouter)

module.exports = app

