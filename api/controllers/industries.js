const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { Applicant, Industry } = db;

const getAllIndustries = asyncMiddleware(async (req, res, next) => {
  const industries = await Industry.findAll();
  res.json({
    successful: true,
    result: industries,
    status: 200
  });
});

const addIndustriesToApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { industryIds } = req.body;
  const applicant = await Applicant.findById(applicantId);
  const skills = applicant.addIndustries(industryIds);
  res.json({
    successful: true,
    result: skills,
    status: 201
  });
});

module.exports = {
  getAllIndustries,
  addIndustriesToApplicant
};
