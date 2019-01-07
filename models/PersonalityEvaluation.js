module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "PersonalityEvaluation",
    {
      uuid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      answers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      currentQuestionIndex: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      scoreSignature: {
        type: DataTypes.STRING,
        allowNull: true
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    { freezeTableName: true }
  );
