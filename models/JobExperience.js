module.exports = (sequelize, DataTypes) =>
  sequelize.define("JobExperience", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numOfYears: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentlyWorkingHere: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
