const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const  User  = require('../model/userModel')
const { use } = require('express/lib/application')
const { off } = require('../model/userModel')


const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
    
})

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('User doesnt exist')
    }
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

const getMe = asyncHandler(async (req,res) => {
    const user = await User.find()
    res.json(user)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
