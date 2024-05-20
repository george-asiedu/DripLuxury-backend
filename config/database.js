const { Sequelize } = require("sequelize")

const env = process.env.NODE_ENV || "development"
const config = require('./config')

if (!config[env]) {
    console.error(`Error: Configuration for environment '${env}' not found.`)
    process.exit(1)
}

const sequelize = new Sequelize(config[env])

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
        process.exit(1)
    })

module.exports = sequelize