module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "IndustrySector",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      displayName: {
        type: DataTypes.STRING
      },
      initials: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true }
  );
