const Promise = require("bluebird");
const db = require("../../models");

const { Applicant, Industry } = db;

const addIndustriesToApplicant = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { industryIds } = req.body;
  Applicant.findById(applicantId)
    .then(applicant => applicant.addIndustries(industryIds))
    .then(skills =>
      res.json({
        successful: true,
        data: {
          skills
        },
        status: 201
      })
    )
    .catch(next);
};

module.exports = {
  addIndustriesToApplicant
};
