require('./db/mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./Routers/user')
const taskRouter = require('./Routers/task')

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log('Server is up on port ' + port))
