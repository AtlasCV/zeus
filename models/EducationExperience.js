module.exports = (sequelize, DataTypes) => sequelize.define('EducationExperience', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  areaOfStudy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gpa: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  educationLevel: {
    type: DataTypes.STRING,
    allowNull: true
  },
  university: {
    type: DataTypes.STRING,
    allowNull: true
  }
});