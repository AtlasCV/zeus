module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Applicant",
    {
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
      },
      signupComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      currentPageOfSignup: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      website: {
        type: DataTypes.STRING
      },
      resumeUrl: {
        type: DataTypes.STRING
      },
      videoUrl: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true }
  );
