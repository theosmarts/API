'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type:DataTypes.STRING,
    },
    createdBy: DataTypes.STRING,
    ModifiedBy: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(
      models.User,
      {
        through: 'UseRoles',
        foriegnKey: 'roleId',
        otherKey: 'userId'
      }
    )
  };
  return Role;
};