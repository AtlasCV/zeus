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
      }
    },
    { freezeTableName: true }
  );
