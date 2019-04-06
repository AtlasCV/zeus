module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Certification",
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
      initials: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true }
  );
