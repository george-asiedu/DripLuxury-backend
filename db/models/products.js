const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notNull: {
                  msg: 'type cannot be null',
              },
              notEmpty: {
                  msg: 'type cannot be empty',
              },
          },
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
    imageOverlay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'product image overlay cannot be null',
            },
            notEmpty: {
                msg: 'product image overlay cannot be empty',
            },
            isUrl: {
                msg: 'Invalid product image overlay url string',
            },
        },
    },
    detailsImage: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Details image cannot be null',
            },
            notEmpty: {
                msg: 'Details image cannot be empty',
            },
            isUrl: {
                msg: 'Invalid details image url string',
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
    shortDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'short description cannot be null',
          },
          notEmpty: {
            msg: 'short description cannot be empty',
          },
        },
      },
    longDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'long description cannot be null',
            },
            notEmpty: {
                msg: 'long description cannot be empty',
            },
        },
    },
    washingInstructions: {
        type: DataTypes.STRING
    },
    highlights: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
      sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'size cannot be null',
          },
          notEmpty: {
            msg: 'size must not be empty',
          },
        },
      },
    composition: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'composition cannot be null',
            },
            notEmpty: {
                msg: 'composition must not be empty',
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