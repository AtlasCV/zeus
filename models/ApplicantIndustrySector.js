module.exports = (sequelize, DataTypes) =>
  sequelize.define("ApplicantIndustrySector", {
    yearsExperience: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
