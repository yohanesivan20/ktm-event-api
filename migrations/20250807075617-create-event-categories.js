'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('event_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      description: {
        type: Sequelize.STRING(255)
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('event_categories')
  }
};
