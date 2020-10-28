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

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const secret = 'thisismynewcourse'
    const token = jwt.sign({ _id: 'abc123' }, secret, { expiresIn: '7 days'})
    console.log(token)

    const data = jwt.verify(token, secret)
    console.log(data)
}

myFunction()