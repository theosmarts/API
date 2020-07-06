'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
       id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobileAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payrollNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailAddressConfirmed: {
        type: Sequelize.BOOLEAN
      },
      phoneNumberConfirmed: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      twoFactorEnabled: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      AccessFailedCount: {
        type: Sequelize.INTEGER
      },
      isLockedOut: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.INTEGER
      },
      lastPasswordChanged: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING
      },
      ModifiedBy: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Users');
  }
};
