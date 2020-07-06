"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Companies", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      regNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      postalAddress: {
        type: Sequelize.STRING,
      },
      physicalAddress: {
        type: Sequelize.STRING,
      },
      mobileAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      shortName: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      twoFactorAuthentication: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      databaseName: {
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      ModifiedBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Companies");
  },
};
