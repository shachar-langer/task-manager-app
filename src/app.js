const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// Parsing the incoming JSON data to a JS object
app.use(express.json())

// Registering the routers for the resources
app.use(userRouter)
app.use(taskRouter)

module.exports = app