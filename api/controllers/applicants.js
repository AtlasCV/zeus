const db = require("../../models");
const errorWithCode = require("../helpers/error");

const { Applicant, User } = db;

const getAllApplicants = (req, res, next) => {
  Applicant.findAll({
    include: [User],
    attributes: { exclude: ["salt", "hashedPassword"] }
  })
    .then(applicants => {
      res.json({
        successful: true,
        data: { applicants },
        status: 200
      });
    })
    .catch(next);
};

const getApplicantById = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  Applicant.findById(applicantId, {
    include: [User],
    attributes: { exclude: ["salt", "hashedPassword"] }
  })
    .then(applicant => {
      if (!applicant)
        throw errorWithCode("Applicant with this id does not exist!", 404);
      res.json({
        data: { applicant },
        successful: true,
        status: 200
      });
    })
    .catch(next);
};

const createApplicant = (req, res, next) => {
  const { email, firstName, lastName, linkedIn } = req.body;
  const newApplicantProps = { linkedIn };
  const newUserProps = { firstName, lastName, email, userType: "Applicant" };

  User.findOne({ where: { email } })
    .then(applicant => {
      if (applicant) {
        throw new Error("Applicant with this email already exists");
      }
      return Promise.all([
        Applicant.create(newApplicantProps),
        User.create(newUserProps)
      ]);
    })
    .then(([applicant, user]) => applicant.setUser(user))
    .then(applicant =>
      applicant.getUser({
        include: [Applicant],
        attributes: { exclude: ["salt", "hashedPassword"] }
      })
    )
    .then(user => {
      res.json({
        successful: true,
        data: {
          user
        },
        status: 201
      });
    })
    .catch(next);
};

const updateApplicant = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    city,
    profilePhoto,
    transcript,
    aboutMe,
    gender,
    phone,
    birthday,
    profileImgUrl,
    linkedIn
  } = req.swagger.params.data.value;
  const applicantId = req.swagger.params.applicantId.value;

  Applicant.findById(applicantId)
    .then(applicant => {
      if (!applicant) {
        throw errorWithCode("This applicant does not exist!", 404);
      }
      return Promise.all([applicant.getUser(), applicant]);
    })
    .then(([user, applicant]) => {
      if (!user) {
        throw errorWithCode("This user does not exist!", 404);
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
    .then(([applicant, user]) => applicant.getUser({ include: [Applicant] }))
    .then(user => {
      if (!user) {
        throw errorWithCode(
          "This applicant was not updated successfully!",
          500
        );
      }
      res.json({
        status: 201,
        data: { user },
        successful: true
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
