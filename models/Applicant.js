module.exports = (sequelize, DataTypes) =>
  sequelize.define("Applicant", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transcript: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
