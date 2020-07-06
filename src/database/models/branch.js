'use strict';
module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payBillNumber: DataTypes.STRING,
    isHeadOffice: DataTypes.BOOLEAN,
    companyId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: DataTypes.STRING,
    ModifiedBy: DataTypes.STRING
  }, {});
  Branch.associate = function (models) {
    // associations can be defined here
    Branch.belongsTo(models.Company)
  };
  return Branch;
};