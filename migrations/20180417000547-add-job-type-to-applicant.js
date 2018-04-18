"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn("Applicants", "jobType", {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Applicants", "jobType");
  }
};
