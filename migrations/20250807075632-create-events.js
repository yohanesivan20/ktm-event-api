'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'event-categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      event_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      registration_start_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      registration_end_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      banner_url: {
        type: Sequelize.TEXT
      },
      form_url: {
        type: Sequelize.STRING(255)
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      updated_by: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('events')
  }
};
