'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING
      },
      productImage: {
        type: Sequelize.STRING
      },
      imageOverlay: {
        type: Sequelize.STRING
      },
      detailsImage: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      longDescription: {
        type: Sequelize.TEXT
      },
      washingInstructions: {
        type: Sequelize.STRING
      },
      highlights: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      category: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      sizes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      composition: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product')
  }
};