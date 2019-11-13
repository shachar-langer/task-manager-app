const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const isObjectIDValid = require('../db/mongoose')  // Requiring our monogoose file so we connect to mongoose
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=[true|false]

// limit is the number of results we return
// skip is the number of result we want to skip. If we skip 0, we get the first {{limit}} results.
// If we skip {{limit}} results, we'll get the second batch of {{limit}} results
// GET /tasks?limit=10&skip=0

// GET /tasks?sortBy={{field}}:[asc|desc]
router.get('/tasks', auth, async (req, res) => {
    // If 'completed' is provided, we will change the match object.
    // Otherwise, if completed is not provided, we will return all tasks.
    const match = {}
    
    // if the 'sortBy' is provided, we will sort the results.
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    // sort recieve a field name and 1 for ascending order or -1 for descending order
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // Finding all the tasks of the logged in user using the find function
        // const tasks = await Task.find({ owner: req.user._id })

        // Finding all the tasks of the logged in user by populating the tasks field
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                // if limit or skip aren't integers or don't exist, mongoose will ignore them
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),

                sort
            }
        }).execPopulate()
        const tasks = req.user.tasks
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    if (!isObjectIDValid(_id)) {
        return res.status(400).send({error: 'Invalid ID format'})
    }

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid arguments found'})
    }

    const _id = req.params.id

    if (!isObjectIDValid(_id)) {
        return res.status(400).send({error: 'Invalid ID format'})
    }

    try {
        // Fetching the task and changing it through mongoose operations.
        // The 'findByIdAndUpdate' method below works, but it doesn't use
        // the 'save' method of mongoose. This is a problem when we want to
        // run a hook before the 'save' method
        const task = await Task.findOne({ _id, owner: req.user._id })

        // The 'new' option tells findByIdAndUpdate to return the new task and not the old one
        // The 'runValidators' option tells findByIdAndUpdate to run validations on the update
        // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    if (!isObjectIDValid(_id)) {
        return res.status(400).send({error: 'Invalid ID format'})
    }

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router