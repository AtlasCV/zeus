const Promise = require("bluebird");
const db = require("../../models");

const { Applicant, EducationExperience } = db;

const addEducationToApplicant = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { areaOfStudy, gpa, educationLevel, university } = req.body;

  Applicant.findById(applicantId),
    EducationExperience.create({
      areaOfStudy,
      gpa,
      educationLevel,
      university,
      ApplicantId: applicantId
    })
      .then(educationExperience => {
        res.json({
          successful: true,
          data: educationExperience,
          status: 201
        });
      })
      .catch(next);
};

module.exports = {
  addEducationToApplicant
};
