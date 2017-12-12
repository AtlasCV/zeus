module.exports = (sequelize, DataTypes) =>
  sequelize.define("ApplicantSkill", {
    yearsExperience: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
