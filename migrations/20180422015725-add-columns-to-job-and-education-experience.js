"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("EducationExperiences", "graduationYear", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("JobExperiences", "companyName", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Skills", "displayName", {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: function(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("EducationExperiences", "graduationYear"),
      queryInterface.removeColumn("JobExperiences", "companyName"),
      queryInterface.removeColumn("Skills", "displayName")
    ]);
  }
};
