const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { JobExperience } = db;

const addJobExperienceToApplicant = asyncMiddleware(async (req, res, next) => {
  const ApplicantId = req.swagger.params.applicantId.value;
  const {
    name,
    numOfYears,
    currentlyWorkingHere,
    description,
    companyName
  } = req.body;

  const jobExperience = await JobExperience.create({
    name,
    numOfYears,
    currentlyWorkingHere,
    description,
    companyName,
    ApplicantId
  });

  res.json({
    successful: true,
    result: jobExperience,
    status: 201
  });
});

const removeJobExperienceFromApplicant = asyncMiddleware(
  async (req, res, next) => {
    const { jobExperienceId } = req.body;
    const jobExperience = await JobExperience.findById(jobExperienceId);
    await jobExperience.destroy();

    res.json({
      successful: true,
      status: 204
    });
  }
);

module.exports = {
  addJobExperienceToApplicant,
  removeJobExperienceFromApplicant
};
