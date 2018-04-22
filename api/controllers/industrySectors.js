const Promise = require("bluebird");
const db = require("../../models");

const { IndustrySector, Applicant, ApplicantIndustrySector } = db;

const getAllIndustrySectors = (req, res, next) => {
  IndustrySector.findAll()
    .then(skills => {
      res.json({
        successful: true,
        result: skills,
        status: 200
      });
    })
    .catch(next);
};

const addIndustrySectorsToApplicant = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { skills } = req.body;
  Applicant.findById(applicantId)
    .then(applicant => {
      return Promise.map(skills, skill => {
        return ApplicantIndustrySector.create({
          ApplicantId: applicant.id,
          IndustrySectorId: skill.id,
          yearsExperience: skill.yearsExperience
        });
      });
    })
    .then(skills => {
      res.json({
        successful: true,
        data: skills,
        status: 201
      });
    })
    .catch(next);
};

module.exports = {
  getAllIndustrySectors,
  addIndustrySectorsToApplicant
};
