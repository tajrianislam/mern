const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
    text: {
        type: String,
        require: [true, 'please add text value']
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Goal', goalSchema)