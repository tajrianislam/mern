// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (req,res) => {
    res.json({message:'get Goals'})
}

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoals = (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add text title")
    }
    console.log(req.body)

    res.json({message: "set goals"})
}

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoals = (req,res) => {
    res.json({message: `Update goal ${req.params.id}`})
}

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = (req,res) => {
    res.json({message: `Delete goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}