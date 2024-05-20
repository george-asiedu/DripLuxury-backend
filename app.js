require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const adminRoute = require('./routes/usersRoute')
const productRoute = require('./routes/productRoutes')
const AppError = require("./utils/appError");
const catchErrorAsync = require("./utils/catchErrorAsync")
const globalErrorHandler = require('./controllers/errorController')

app.use(express.json())
app.use(cors())

app.use('/api/v1/auth', authRoutes)
app.use('/api/users', adminRoute)
app.use('/api/products', productRoute)

app.use('*', catchErrorAsync(async (req) => {
    throw new AppError(`Cannot find ${req.originalUrl}, on server port ${port}`, 401)
}))

app.use(globalErrorHandler)

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server running on port ${port}`))