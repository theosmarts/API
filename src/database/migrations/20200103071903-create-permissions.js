'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      roleId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      create: {
        type: Sequelize.BOOLEAN
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      update: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      delete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};