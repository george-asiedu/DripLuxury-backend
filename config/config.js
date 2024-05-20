require('dotenv').config({ path: `${process.cwd()}/.env` })

const developmentConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  seederStorage: 'sequelize'
}

const testConfig = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql"
}

const productionConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  seederStorage: 'sequelize'
}

const config = {
  development: developmentConfig,
  test: testConfig,
  production: productionConfig
}

if (!developmentConfig.username || !developmentConfig.password || !developmentConfig.database || !developmentConfig.host || !developmentConfig.port) {
  console.error("Error: Missing database configuration. Please check your .env file.")
  process.exit(1)
}

module.exports = config