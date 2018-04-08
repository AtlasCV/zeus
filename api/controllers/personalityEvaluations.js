const db = require("../../models");
const errorWithCode = require("../helpers/error");
const asyncMiddleware = require("../helpers/asyncMiddleware");
const uuidv1 = require("uuid/v1");

const { PersonalityEvaluations } = db;

const createPersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const personalityEvaluation = await PersonalityEvaluations.create({
    uuid: uuidv1(),
    answers: [],
    currentQuestionIndex: 0,
    completed: false
  });

  res.json({
    successful: true,
    result: personalityEvaluation,
    status: 201
  });
});

const getPersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const uuid = req.swagger.params.uuid.value;

  const personalityEvaluation = await PersonalityEvaluations.findOne({
    where: { uuid }
  });
  res.json({
    successful: true,
    result: personalityEvaluation,
    status: 200
  });
});

const updatePersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const uuid = req.swagger.params.uuid.value;
  const { answers, currentQuestionIndex, scoreSignature, completed } = req.body;
  const personalityEvaluation = await PersonalityEvaluations.findOne({
    where: { uuid }
  });

  const newAnswers = personalityEvaluation.answers
    .slice(0, currentQuestionIndex - 5)
    .concat(answers)
    .concat(personalityEvaluation.answers.slice(currentQuestionIndex));

  const updatedEvaluation = await personalityEvaluation.updateAttributes({
    currentQuestionIndex,
    answers: newAnswers,
    completed,
    scoreSignature
  });

  res.json({
    successful: true,
    result: personalityEvaluation,
    status: 200
  });
});

module.exports = {
  createPersonalityEvaluation,
  updatePersonalityEvaluation,
  getPersonalityEvaluation
};
