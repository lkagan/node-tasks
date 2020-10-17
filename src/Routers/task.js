const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        res.send(await Task.find({}));
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router