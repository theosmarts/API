"use strict";
module.exports = (sequelize, DataTypes) => {
  const Enumeration = sequelize.define(
    "Enumeration",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      ekey: {
        type: DataTypes.STRING,
        allowNull: false
      },
      evalue: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Enumeration.associate = function(models) {
    // associations can be defined here
  };
  return Enumeration;
};
