'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    featureId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNul: false
    },
    create: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN
  }, {});
  permissions.associate = function (models) {
    // associations can be defined here
  };
  return permissions;
};