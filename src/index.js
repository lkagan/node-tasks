require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is up on port ' + port))

// Automatically parse incoming JSON to an object.
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => {
            res.status(201).send(user)
        })
        .catch(e => {
            res.status(400).send(e)
        })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save()
        .then(() => {
            res.status(201).send(task)
        })
        .catch(e => {
            res.status(400).send(e)
        })
})
