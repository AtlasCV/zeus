const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { Skill, Applicant, ApplicantSkill } = db;

const getAllSkills = (req, res, next) => {
  Skill.findAll()
    .then(skills => {
      res.json({
        successful: true,
        result: skills,
        status: 200
      });
    })
    .catch(next);
};

const addSkillsToApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { skill } = req.body;

  const associatedSkill = await ApplicantSkill.create({
    ApplicantId: applicantId,
    SkillId: skill.id,
    yearsExperience: skill.yearsExperience
  });
  res.json({
    successful: true,
    result: associatedSkill,
    status: 201
  });
});

const removeSkillFromApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { skillId } = req.body;

  await ApplicantSkill.destroy({
    where: {
      ApplicantId: applicantId,
      SkillId: skillId
    }
  });

  res.json({
    successful: true,
    result: {},
    status: 204
  });
});

module.exports = {
  getAllSkills,
  addSkillsToApplicant
};
