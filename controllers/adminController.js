const { Sequelize } = require('sequelize')
const user = require('../db/models/user')
const catchErrorAsync = require('../utils/catchErrorAsync')

const getAllUser = catchErrorAsync(async (req, res, next) => {
    const users = await user.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: "Super Admin",
            },
        },
        attributes: { exclude: ['password'] },
    })
    return res.status(200).json({
        status: 'success',
        data: users,
    })
})

module.exports = { getAllUser }