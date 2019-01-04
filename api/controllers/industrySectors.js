const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { IndustrySector, ApplicantIndustrySector } = db;

const getAllIndustrySectors = (req, res, next) => {
  IndustrySector.findAll()
    .then(industrySectors => {
      res.json({
        successful: true,
        result: industrySectors,
        status: 200
      });
    })
    .catch(next);
};

const getIndustrySectorsByIndustry = asyncMiddleware(async (req, res, next) => {
  const industryId = req.swagger.params.industryId.value;
  const industrySectors = await IndustrySector.findAll({
    where: {
      IndustryId: industryId
    }
  });
  res.json({
    successful: true,
    result: industrySectors,
    status: 200
  });
});

const addIndustrySectorsToApplicant = asyncMiddleware(
  async (req, res, next) => {
    const applicantId = req.swagger.params.applicantId.value;
    const { industrySector } = req.body;

    const associatedIndustrySector = await ApplicantIndustrySector.create({
      ApplicantId: applicantId,
      IndustrySectorId: industrySector.id,
      yearsExperience: industrySector.yearsExperience
    });
    res.json({
      successful: true,
      result: associatedIndustrySector,
      status: 201
    });
  }
);

const removeIndustrySectorFromApplicant = asyncMiddleware(
  async (req, res, next) => {
    const applicantId = req.swagger.params.applicantId.value;
    const { industrySectorId } = req.body;

    await ApplicantIndustrySector.destroy({
      where: {
        ApplicantId: applicantId,
        IndustrySectorId: industrySectorId
      }
    });

    res.json({
      successful: true,
      result: {},
      status: 204
    });
  }
);

module.exports = {
  getAllIndustrySectors,
  addIndustrySectorsToApplicant,
  removeIndustrySectorFromApplicant,
  getIndustrySectorsByIndustry
};
