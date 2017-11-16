module.exports = (sequelize, DataTypes) =>
  sequelize.define("Match", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    applicantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    matchScore: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
