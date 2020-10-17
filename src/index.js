require('./db/mongoose')
const mongoose = require('mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')

app.listen(port, () => console.log('Server is up on port ' + port))

// Automatically parse incoming JSON to an object.
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
