module.exports = (sequelize, DataTypes) =>
  sequelize.define("Job", {
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
    industryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
