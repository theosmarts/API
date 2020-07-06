"use strict";
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      postalAddress: DataTypes.STRING,
      physicalAddress: DataTypes.STRING,
      mobileAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: DataTypes.STRING,
      logo: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      databaseName: DataTypes.STRING,
      twoFactorAuthentication: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdBy: DataTypes.STRING,
      ModifiedBy: DataTypes.STRING,
    },
    {}
  );
  Company.associate = function (models) {
    // associations can be defined here
  };
  return Company;
};
