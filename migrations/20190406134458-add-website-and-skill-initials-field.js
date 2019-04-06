const Promise = require("bluebird");

("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Skill", "initials", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("IndustrySector", "initials", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("IndustrySector", "displayName", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Certification", "initials", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Applicant", "website", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Applicant", "resumeUrl", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.addColumn("Applicant", "videoUrl", {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Skill", "initials"),
      queryInterface.removeColumn("IndustrySector", "initials"),
      queryInterface.removeColumn("IndustrySector", "displayName"),
      queryInterface.removeColumn("Certification", "initials"),
      queryInterface.removeColumn("Applicant", "website"),
      queryInterface.removeColumn("Applicant", "resumeUrl"),
      queryInterface.removeColumn("Applicant", "videoUrl")
    ]);
  }
};
