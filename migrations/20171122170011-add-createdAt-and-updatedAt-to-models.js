"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    Promise.all([
      queryInterface.addColumn("Applicants", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Applicants", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Certifications", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Certifications", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("EducationExperiences", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("EducationExperiences", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Industries", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Industries", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Jobs", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Jobs", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("JobExperiences", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("JobExperiences", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Matches", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Matches", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Skills", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Skills", "updatedAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Users", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Users", "updatedAt", {
        type: Sequelize.DATE
      })
    ]);
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
