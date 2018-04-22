const Promise = require("bluebird");
const db = require("../../models");

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

const addSkillsToApplicant = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { skills } = req.body;
  Applicant.findById(applicantId)
    .then(applicant => {
      return Promise.map(skills, skill => {
        return ApplicantSkill.create({
          ApplicantId: applicant.id,
          SkillId: skill.id,
          yearsExperience: skill.yearsExperience
        });
      });
    })
    .then(skills => {
      res.json({
        successful: true,
        result: skills,
        status: 201
      });
    })
    .catch(next);
};

module.exports = {
  getAllSkills,
  addSkillsToApplicant
};
