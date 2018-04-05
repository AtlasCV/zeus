const jwt = require("jsonwebtoken");
const db = require("../../models");
const errorWithCode = require("../helpers/error");

const secret = process.env.APP_JWT_SECRET || "this is a temp secret string";

const { User, Applicant } = db;

const issueToken = (savedUser, userType, res) => {
  const { id, email, firstName, lastName } = savedUser.dataValues;
  return res.json({
    success: true,
    result: jwt.sign(
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

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
    include: [Applicant]
  })
    .then(user => {
      if (!user) {
        throw errorWithCode("User does not exist!", 404);
      }
      return Promise.all([user.authenticate(password), user]);
    })
    .then(([success, user]) => {
      if (!success) {
        throw errorWithCode("Password is incorrect", 401);
      }
      return issueToken(user, user.userType, res);
    })
    .catch(next);
};

module.exports = {
  confirmUser,
  login
};
