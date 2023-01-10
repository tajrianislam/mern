const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalModel')
// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find()
    res.json(goals)
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add text title")
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    // console.log(goal)

    res.json(goal)
})

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id) 
    if (!goal) {
        res.status(400)
        throw new Error ('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.json(updatedGoal)
})

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error ('Goal not found')
    }
    const deletedGoal = await Goal.deleteOne(goal)
    res.json( `Delete goal ${req.params.id}`)
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
