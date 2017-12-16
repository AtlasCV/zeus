const db = require("../../models");

const { User, Applicant } = db;

const confirmUser = (req, res, next) => {
  const userId = req.swagger.params.userId.value;
  const { password } = req.body;

  User.findById(userId)
    .then(user => {
      if (!user) {
        throw new Error("This user does not exist!");
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
    .then(user =>
      res.json({
        success: true,
        data: {
          user
        },
        status: 200
      })
    )
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
        throw new Error("User does not exist!");
      }
      return Promise.all([user.authenticate(password), user]);
    })
    .then(([success, user]) => {
      if (!success) {
        throw new Error("Password is incorrect");
      }
      delete user.dataValues.hashed_password;
      delete user.dataValues.salt;
      res.json({
        success: true,
        data: {
          user
        },
        status: 200
      });
    })
    .catch(next);
};

module.exports = {
  confirmUser,
  login
};
