"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("PersonalityEvaluation", {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      answers: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },
      currentQuestionIndex: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      scoreSignature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      ApplicantId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("PersonalityEvaluation");
  }
};
