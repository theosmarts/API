"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userName: DataTypes.STRING,
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payrollNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailAddressConfirmed: DataTypes.BOOLEAN,
      phoneNumberConfirmed: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      twoFactorEnabled: {
        type: DataTypes.STRING,
        defaultValue: false,
      },
      AccessFailedCount: DataTypes.INTEGER,
      isLockedOut: DataTypes.BOOLEAN,
      status: DataTypes.INTEGER,
      lastPasswordChanged: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      ModifiedBy: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Role, {
      through: "UserRoles",
      foreignKey: "userId",
      otherKey: "roleId",
    }),
      User.belongsToMany(models.Branch, {
        through: "UserBranches",
        foreignKey: "userId",
        otherKey: "branchId",
      });
    User.belongsToMany(models.Company, {
      through: "UserCompanies",
      foreignKey: "userId",
      otherKey: "companyId",
    });
  };
  return User;
};
