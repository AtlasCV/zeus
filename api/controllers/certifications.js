const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { Certification, ApplicantCertification, Applicant } = db;

const getAllCertifications = (req, res, next) => {
  Certification.findAll()
    .then(certifications => {
      res.json({
        successful: true,
        result: certifications,
        status: 200
      });
    })
    .catch(next);
};

const addCertificationsToApplicant = asyncMiddleware(async (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  const { certification } = req.body;

  const applicantToAssociate = await Applicant.findById(applicantId);
  const associatedCertification = await applicantToAssociate.addCertification(
    certification.id
  );

  res.json({
    successful: true,
    result: associatedCertification,
    status: 201
  });
});

const removeCertificationFromApplicant = asyncMiddleware(
  async (req, res, next) => {
    const applicantId = req.swagger.params.applicantId.value;
    const { certificationId } = req.body;

    const applicantToAssociate = await Applicant.findById(applicantId);
    await applicantToAssociate.removeCertification(certificationId);

    res.json({
      successful: true,
      result: {},
      status: 204
    });
  }
);

module.exports = {
  getAllCertifications,
  addCertificationsToApplicant,
  removeCertificationFromApplicant
};
