const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { Applicant, JobExperience } = db;

const addEducationToApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { areaOfStudy, gpa, educationLevel, university } = req.body;

  const educationExperience = await JobExperience.create({
    areaOfStudy,
    gpa,
    educationLevel,
    university,
    ApplicantId: applicantId
  });

  res.json({
    successful: true,
    data: educationExperience,
    status: 201
  });
});

module.exports = {
  addEducationToApplicant
};
