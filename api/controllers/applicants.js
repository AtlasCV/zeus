const db = require("../../models");

const { Applicant, User } = db;

const getAllApplicants = (req, res, next) => {
  Promise.all([Applicant.findAll()])
    .then(applicants => {
      res.json({
        message: "Successfully retrieved applicants!",
        applicants
      });
    })
    .catch(next);
};

const getApplicantById = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  Applicant.findById(applicantId)
    .then(applicant => {
      if (!applicant) throw Error("Applicant with this id does not exist!");
      res.json({
        message: "Successfully retrieved applicant!",
        applicants: applicant
      });
    })
    .catch(next);
};

const createApplicant = (req, res, next) => {
  const { email, firstName, lastName } = req.swagger.params.data.value;
  const newApplicantProps = { linkedIn };
  const newUserProps = { firstName, lastName, email };

  User.findOne({ where: { email } })
    .then(applicant => {
      if (applicant)
        throw errorWithStatus("Applicant with this email already exists", 400);
      return Promise.all([
        Applicant.create(newApplicantProps),
        User.create(newUserProps)
      ]);
    })
    .then(([applicant, user]) =>
      Promise.all([applicant.update({ userId: user.id }), user])
    )
    .then(([applicant, user]) =>
      res.json({
        message: "Successfully created applicant",
        applicant: { ...applicant, user },
        status: 201
      })
    )
    .catch(next);
};

const updateApplicant = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    city,
    skills,
    profilePhoto,
    transcript,
    certifications,
    desiredIndustry,
    aboutMe,
    gender,
    phone,
    birthday,
    profileImgUrl
  } = req.swagger.params.data.value;
  const applicantId = req.swagger.params.applicantId.value;

  Promise.all([
    Applicant.findById(applicant.id),
    User.findOne({ where: { applicantId } })
  ])
    .then(([applicant, user]) => {
      if (!applicant || !user) {
        throw Error("This applicant does not exist!");
      }
      const applicantProps = {
        linkedIn: linkedIn || applicant.linkedIn,
        aboutMe: aboutMe || applicant.aboutMe,
        transcript: transcript || applicant.transcript,
        city: city || applicant.city
      };
      const userProps = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        phone: phone || user.phone,
        gender: gender || user.gender,
        birthday: birthday || user.birthday,
        profileImgUrl: profileImgUrl || user.profileImgUrl
      };
      return Promise.all([
        applicant.updateAttributes(applicantProps),
        user.updateAttributes(userProps)
      ]);
    })
    .then(([applicant, user]) => {
      if (!applicant || !user) {
        throw Error("This applicant was not updated successfully!");
      }
      res.json({
        message: "Successfully updated applicant",
        applicant: { ...applicant, user }
      });
    })
    .catch(next);
};

module.exports = {
  getAllApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant
};
