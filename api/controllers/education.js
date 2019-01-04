const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { EducationExperience } = db;

const addEducationToApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const {
    areaOfStudy,
    gpa,
    educationLevel,
    university,
    graduationYear
  } = req.body;

  const educationExperience = await EducationExperience.create({
    areaOfStudy,
    gpa,
    educationLevel,
    university,
    graduationYear,
    ApplicantId: applicantId
  });

  res.json({
    successful: true,
    result: educationExperience,
    status: 201
  });
});

module.exports = {
  addEducationToApplicant
};
