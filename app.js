require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const AppError = require("./utils/appError");
const catchErrorAsync = require("./utils/catchErrorAsync")

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRoutes)

app.use('*', catchErrorAsync(async (req, res, next) => {
    throw new AppError(`Cannot find ${req.originalUrl}, on server port ${port}`, 401)
}))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server running on port ${port}`))