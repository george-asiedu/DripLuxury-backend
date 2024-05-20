const bcrypt = require("bcrypt");
require('dotenv').config({ path: `${process.cwd()}/.env` })

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD
    const hashPassword = bcrypt.hashSync(password, 10)
    return queryInterface.bulkInsert('user', [
      {
        userType: 'Super Admin',
        firstName: 'NLE',
        lastName: 'Moski',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', { userType: 'Super Admin' }, {})
  }
}