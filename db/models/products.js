const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'name cannot be null',
          },
          notEmpty: {
            msg: 'name cannot be empty',
          },
        },
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'product image cannot be null',
          },
          notEmpty: {
            msg: 'product image cannot be empty',
          },
          isUrl: {
            msg: 'Invalid product image url string',
          },
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'price cannot be null',
          },
          isDecimal: {
            msg: 'price value must be in decimal',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'description cannot be null',
          },
          notEmpty: {
            msg: 'description cannot be empty',
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'category cannot be null',
          },
          notEmpty: {
            msg: 'category cannot be empty',
          },
        },
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'tags cannot be null',
          },
          notEmpty: {
            msg: 'tags cannot be empty',
          },
        },
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'rating cannot be null',
          },
          isDecimal: {
            msg: 'rating value must be in decimal',
          },
        },
      },
      dressStyle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'dress style cannot be null',
          },
          notEmpty: {
            msg: 'dress style must not be empty',
          },
        },
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'color cannot be null',
          },
          notEmpty: {
            msg: 'color must not be empty',
          },
        },
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'size cannot be null',
          },
          notEmpty: {
            msg: 'size mus not be empty',
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      paranoid: true,
      freezeTableName: true,
      modelName: 'product'
    }
)