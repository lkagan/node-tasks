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

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        return  res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['age', 'name', 'email', 'password']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (! isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        if (! user) {
            return res.status(404).send()
        }

        res.send(user);
    }  catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (! user) {
            return res.status(404).send()
        }

        return res.send(user)
    } catch (e) {
        return res.status(500).send()
    }
})

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