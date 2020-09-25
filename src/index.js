require('./db/mongoose')
const mongoose = require('mongoose')
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

app.get('/users', (req, res) => {
     User.find({})
         .then((users) => {
            res.send(users)
         })
         .catch((e) => {
            res.status(500).send(e)
         })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send()
            }

            return  res.send(user)
        })
        .catch(e => res.status(500).send(e))
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

app.get('/tasks', (req, res) => {
    Task.find({})
        .then(tasks => tasks ? res.send(tasks) : res.status(404).send())
        .catch(e => res.status(500).send())
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    if (! mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send()
    }
    Task.findById(req.params.id)
        .then(task => task ? res.send(task) : res.status(404).send())
        .catch(e => res.status(500).send())
})