const Promise = require("bluebird");
const db = require("../../models");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const { Certification, ApplicantCertification } = db;

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

  const associatedCertification = await ApplicantCertification.create({
    ApplicantId: applicantId,
    CertificationId: certification.id
  });
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

    await ApplicantCertification.destroy({
      where: {
        ApplicantId: applicantId,
        CertificationId: certificationId
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
  getAllCertifications,
  addCertificationsToApplicant,
  removeCertificationFromApplicant
};
