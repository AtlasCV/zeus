const jwt = require("jsonwebtoken");
const db = require("../../models");
const errorWithCode = require("../helpers/error");
const asyncMiddleware = require("../helpers/asyncMiddleware");

const secret = process.env.APP_JWT_SECRET || "this is a temp secret string";

const {
  User,
  Applicant,
  PersonalityEvaluation,
  Industry,
  EducationExperience,
  JobExperience,
  Skill,
  ApplicantSkill,
  IndustrySector,
  ApplicantIndustrySector,
  Certification,
  ApplicantCertification
} = db;

const issueToken = (user, userType, res) => {
  const { id, email, firstName, lastName } = user.dataValues;
  return res.json({
    success: true,
    result: {
      user,
      token: jwt.sign(
        {
          id,
          email: email.toLowerCase(),
          firstName,
          lastName,
          userType,
          iat: Math.floor(Date.now() / 1000) - 30
        },
        secret,
        { expiresIn: 60 * 60 * 24 * 60 }
      )
    }
  });
};

const confirmUser = (req, res, next) => {
  const userId = req.swagger.params.userId.value;
  const { password } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw errorWithCode("This user does not exist!", 404);
      }
      return user.updateAttributes({
        password,
        activated: true
      });
    })
    .then(user =>
      User.findById(user.id, {
        include: [Applicant],
        attributes: { exclude: ["password", "hashed_password", "salt"] }
      })
    )
    .then(user => issueToken(user, user.userType, res))
    .catch(next);
};

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.find({ where: { email } });

  const success = await user.authenticate(password);

  if (!user) {
    throw errorWithCode("User does not exist!", 404);
  }
  if (!success) {
    throw errorWithCode("Password is incorrect", 401);
  }

  const userWithAdditionalModels = await User.findById(user.id, {
    include: [
      {
        model: Applicant,
        include: [
          PersonalityEvaluation,
          Industry,
          EducationExperience,
          JobExperience,
          { model: ApplicantSkill, include: [Skill] },
          { model: ApplicantIndustrySector, include: [IndustrySector] }
        ],
        attributes: { exclude: ["password", "salt", "hashed_password"] }
      }
    ]
  });

  return issueToken(userWithAdditionalModels, user.userType, res);
});

const getMe = asyncMiddleware(async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = jwt.decode(authorization);
  const user = await User.findById(id, {
    include: [
      {
        model: Applicant,
        include: [
          PersonalityEvaluation,
          Industry,
          Certification,
          EducationExperience,
          JobExperience,
          { model: ApplicantSkill, include: [Skill] },
          { model: ApplicantIndustrySector, include: [IndustrySector] }
        ],
        attributes: { exclude: ["password", "salt", "hashed_password"] }
      }
    ]
  });
  res.json({
    success: true,
    result: user,
    status: 200
  });
});

module.exports = {
  confirmUser,
  login,
  issueToken,
  getMe
};
