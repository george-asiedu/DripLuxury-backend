'use strict';
const { Model, DataTypes} = require('sequelize')
const sequelize = require('../../config/database')
const bcrypt = require("bcrypt")
const AppError = require("../../utils/appError")

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM("Super Admin", "Creator", "Student")
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "full name is required"
      },
      notEmpty: {
        msg: "full name is required"
      }
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "full name is required"
      },
      notEmpty: {
        msg: "full name is required"
      }
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "email is required"
      },
      notEmpty: {
        msg: "email is required"
      },
      isEmail: {
        msg: "Invalid email id"
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "password is required"
      },
      notEmpty: {
        msg: "password is required"
      }
    },
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if(this.password.length < 8) {
        throw new AppError('Password length must be at least 8 characters', 400)
      }
      if(value === this.password) {
        const hashPassword = bcrypt.hashSync(value, 10)
        this.setDataValue("password", hashPassword)
      } else {
        throw new AppError('Passwords does not match', 401)
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'user'
})