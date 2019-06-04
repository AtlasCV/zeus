const jwt = require("jsonwebtoken");
const db = require("../../models");
const errorWithCode = require("../helpers/error");
const { issueToken } = require("./users");
const {
  Applicant,
  User,
  PersonalityEvaluation,
  JobExperience,
  EducationExperience,
  Industry,
  ApplicantSkill,
  Skill,
  Certification,
  IndustrySector,
  ApplicantIndustrySector
} = db;
const asyncMiddleware = require("../helpers/asyncMiddleware");

const secret = process.env.APP_JWT_SECRET || "this is a temp secret string";

const getAllApplicants = (req, res, next) => {
  Applicant.findAll({
    include: [User, JobExperience, PersonalityEvaluation],
    attributes: { exclude: ["salt", "hashedPassword"] }
  })
    .then(applicants => {
      res.json({
        successful: true,
        result: applicants,
        status: 200
      });
    })
    .catch(next);
};

const getApplicantById = (req, res, next) => {
  const applicantId = req.swagger.params.applicantId.value;
  Applicant.findById(applicantId, {
    include: [
      User,
      PersonalityEvaluation,
      Industry,
      Certification,
      EducationExperience,
      JobExperience,
      { model: ApplicantSkill, include: [Skill] },
      { model: ApplicantIndustrySector, include: [IndustrySector] }
    ],
    attributes: { exclude: ["salt", "hashedPassword"] }
  })
    .then(applicant => {
      if (!applicant)
        throw errorWithCode("Applicant with this id does not exist!", 404);
      res.json({
        successful: true,
        result: applicant,
        status: 200
      });
    })
    .catch(next);
};

const createApplicant = asyncMiddleware(async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    linkedIn,
    password,
    uuid,
    currentPageOfSignup
  } = req.body;
  const newApplicantProps = { linkedIn, currentPageOfSignup };
  const newUserProps = {
    firstName,
    lastName,
    email,
    userType: "Applicant",
    password
  };

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Applicant with this email already exists");
  }

  const [user, applicant, personalityEvaluation] = await Promise.all([
    User.create(newUserProps),
    Applicant.create(newApplicantProps),
    PersonalityEvaluation.findOne({ where: { uuid } })
  ]);

  await Promise.all([
    user.setApplicant(applicant),
    personalityEvaluation.setApplicant(applicant)
  ]);

  const foundUser = await User.findById(user.id, {
    include: [
      {
        model: Applicant,
        include: [PersonalityEvaluation],
        attributes: { exclude: ["password", "salt", "hashed_password"] }
      }
    ]
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: email.toLowerCase(),
      firstName,
      lastName,
      userType: "Applicant",
      iat: Math.floor(Date.now() / 1000) - 30
    },
    secret,
    { expiresIn: 60 * 60 * 24 * 60 }
  );

  res.json({
    successful: true,
    result: {
      user: foundUser,
      token
    },
    status: 201
  });
});

const updateApplicant = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    city,
    transcript,
    aboutMe,
    gender,
    phone,
    birthday,
    profileImgUrl,
    linkedIn,
    jobType,
    currentPageOfSignup,
    signupComplete,
    resumeUrl,
    website
  } = req.swagger.params.data.value;
  const applicantId = req.swagger.params.applicantId.value;

  console.log(signupComplete);

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
        city: city || applicant.city,
        jobType: jobType || applicant.jobType,
        currentPageOfSignup:
          currentPageOfSignup || applicant.currentPageOfSignup,
        signupComplete: signupComplete || applicant.signupComplete,
        resumeUrl: resumeUrl || applicant.resumeUrl,
        website: website || applicant.website
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
    .then(([applicant]) => {
      console.log("in here?", applicant);
      return User.findById(applicant.UserId, {
        include: [
          {
            model: Applicant,
            include: [
              PersonalityEvaluation,
              Industry,
              EducationExperience,
              JobExperience,
              Certification,
              { model: ApplicantSkill, include: [Skill] },
              { model: ApplicantIndustrySector, include: [IndustrySector] }
            ],
            attributes: { exclude: ["password", "salt", "hashed_password"] }
          }
        ]
      });
    })
    .then(user => {
      if (!user) {
        throw errorWithCode(
          "This applicant was not updated successfully!",
          500
        );
      }
      issueToken(user, "Applicant", res);
    })
    .catch(next);
};

module.exports = {
  getAllApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant
};
