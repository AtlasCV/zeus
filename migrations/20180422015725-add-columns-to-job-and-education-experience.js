"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("EducationExperience", "graduationYear", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("JobExperience", "companyName", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Skill", "displayName", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Applicant", "currentPageOfSignup", {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
      queryInterface.addColumn("Applicant", "signupComplete", {
        type: Sequelize.BOOLEAN,
        allowNull: true
      })
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("EducationExperienc", "graduationYear"),
      queryInterface.removeColumn("JobExperience", "companyName"),
      queryInterface.removeColumn("Skill", "displayName"),
      queryInterface.removeColumn("Applicant", "currentPageOfSignup"),
      queryInterface.removeColumn("Applicant", "signupComplete")
    ]);
  }
};
