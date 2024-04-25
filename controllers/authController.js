const user = require('../db/models/user')
const catchErrorAsync = require('../utils/catchErrorAsync')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AppError = require("../utils/appError")

const generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}

const signup = catchErrorAsync(async (req, res, next) => {
    const body = req.body

    const createUser = await user.create({
        userType: req.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    })

    if(!createUser) return next(new AppError('Failed to create the user', 400))

    const result = createUser.toJSON()
    delete result.password
    delete result.deletedAt

    result.token = generateToken({ id: result.id })

    return res.status(201).json({
        status: 'User created successfully',
        data: result
    })
})

const login = catchErrorAsync(async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) return next(new AppError('Provide a valid email or password', 400))

    const result = await user.findOne({ where: { email }})

    if(!result || !(await bcrypt.compare(password, result.password))) return next(new AppError('Incorrect email or password', 401))

    const token = generateToken({ id: result.id })

    return res.status(200).json({
        status: 'Login successful',
        token
    })
})

module.exports = { signup, login }