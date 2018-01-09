const Promise = require("bluebird");
const db = require("../../models");

const { Skill, Applicant, ApplicantSkill } = db;

const getAllSkills = (req, res, next) => {
  Skills.findAll()
    .then(skills => {
      res.json({
        successful: true,
        data: {
          skills
        },
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
        console.log(ApplicantSkill);
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
        data: {
          skills
        },
        status: 201
      });
    })
    .catch(next);
};

module.exports = {
  getAllSkills,
  addSkillsToApplicant
};
