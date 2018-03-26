const db = require("../../models");
const errorWithCode = require("../helpers/error");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { PersonalityEvaluation } = db;

const createPersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const { uuid } = req.body;
  const personalityEvaluation = await PersonalityEvaluation.create({
    uuid,
    answers: [],
    currentQuestionIndex: 0,
    completed: false
  });

  res.json({
    successful: true,
    data: {
      personalityEvaluation
    },
    status: 201
  });
});

const getPersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const uuid = req.swagger.params.uuid.value;
  const personalityEvaluation = await PersonalityEvaluation.findOne({
    where: { uuid }
  });

  res.json({
    successful: true,
    data: {
      personalityEvaluation
    },
    status: 200
  });
});

const updatePersonalityEvaluation = asyncMiddleware(async (req, res, next) => {
  const uuid = req.swagger.params.uuid.value;
  const { answers, currentQuestionIndex, scoreSignature, completed } = req.body;
  const personalityEvaluation = await PersonalityEvaluation.findOne({
    where: { uuid }
  });

  const newAnswers = personalityEvaluation.answers
    .slice(0, currentQuestionIndex)
    .concat(answers)
    .concat(personalityEvaluation.answers.slice(currentQuestionIndex + 5));

  const updatedEvaluation = await personalityEvaluation.updateAttributes({
    currentQuestionIndex,
    answers: newAnswers,
    completed,
    scoreSignature
  });

  res.json({
    successful: true,
    data: {
      updatedEvaluation
    },
    status: 200
  });
});
