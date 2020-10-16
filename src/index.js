require('./db/mongoose')
const mongoose = require('mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRouter = require('./Routers/user')

app.listen(port, () => console.log('Server is up on port ' + port))

// Automatically parse incoming JSON to an object.
app.use(express.json())
app.use(userRouter)

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        res.send(await Task.find({}));
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    if (! mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send()
    }

    try {
        const task = await Task.findById(req.params.id)
        task ? res.send(task) : res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const allowed = ['completed', 'description']

    if (! Object.keys(req.body).every(field => allowed.includes(field))) {
        return res.status(400).send('Invalid updates!')
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )

        if (! task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        return res.send(task)
    } catch (e) {
        return res.status(500).send(e)
    }
})