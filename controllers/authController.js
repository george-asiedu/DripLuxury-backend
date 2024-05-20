require('dotenv').config({ path: `${process.cwd()}/.env` })

const user = require('../db/models/user')
const catchErrorAsync = require('../utils/catchErrorAsync')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const AppError = require("../utils/appError")

const generateToken = payload => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}

const signup = catchErrorAsync(async (req, res, next) => {
    const body = req.body

    const createUser = await user.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    })

    if(!createUser) return next(new AppError('Failed to create the user', 400))

    const result = createUser.toJSON()
    delete result.password
    delete result.deletedAt

    result.token = generateToken({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email
    })

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

    const token = generateToken({
        id: result.id ,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName
    })

    return res.status(200).json({
        status: 'Login successful',
        token
    })
})

const sendEmail = catchErrorAsync( async (email, code) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset Verification Code',
            text: `Your password reset verification code is: ${code}`
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
        throw new AppError('Failed to send email. Please try again later.', 500)
    }
})

const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase()
};

const sendResetPasswordCode = catchErrorAsync(async (req, res, next) => {
    const { email } = req.body

    const existingUser = await user.findOne({ where: { email } })
    if (!existingUser) {
        return next(new AppError('User not found with this email address.', 404))
    }

    const verificationCode = generateVerificationCode()
    existingUser.resetPasswordCode = verificationCode
    await existingUser.save()

    await sendEmail(email, verificationCode)

    res.status(200).json({
        status: 'success',
        message: 'Password reset verification code sent to your email.'
    })
})

const resetPasswordWithCode = catchErrorAsync(async (req, res, next) => {
    const { email, verificationCode, newPassword } = req.body

    const existingUser = await user.findOne({ where: { email } })
    if (!existingUser) {
        return next(new AppError('User not found with this email address.', 404))
    }

    if (existingUser.resetPasswordCode !== verificationCode) {
        return next(new AppError('Invalid verification code.', 400))
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    existingUser.password = hashedPassword
    existingUser.resetPasswordCode = null
    await existingUser.save()

    res.status(200).json({
        status: 'success',
        message: 'Password reset successful. You can now login with your new password.'
    })
})

const authentication = catchErrorAsync(async (req, res, next) => {
    let idToken = ''
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        idToken = req.headers.authorization.split(' ')[1]
    }
    if (!idToken) {
        return next(new AppError('Please login to get access', 401))
    }
    try {
        const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY)
        const freshUser = await user.findByPk(tokenDetail.id)

        if (!freshUser) {
            return next(new AppError('User no longer exists', 400))
        }
        req.user = freshUser
        return next()
    } catch (error) {
        return next(new AppError('Invalid token', 401))
    }
})

const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        if(!userType.includes(req.user.userType)) {
            return next(new AppError("You don't have permission to perform this action.", 403))
        }
    }
    return checkPermission
}


module.exports = { signup, login, sendResetPasswordCode, resetPasswordWithCode, authentication, restrictTo }