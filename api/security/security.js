const secret = process.env.APP_JWT_SECRET || "this is a temp secret string";
const jwt = require("jsonwebtoken");

const db = require("../../models/");
const { Trainer, Client, Admin, TemporaryUser } = db;

const users = {
  Applicant,
  Employer,
  Admin
};

const trainerOnly = (request, definition, token, next) => {
  if (!token) return next(errorWithCode("Please provide token!", 401));
  let payload;

  try {
    // decode token
    payload = jwt.verify(token, secret);
  } catch (error) {
    return next(
      errorWithCode(`The token is invalid! JWT: ${error.message}`, 401)
    );
  }

  const user = payload.userType;

  const User = users[user] || users[payload.userType];
  if (!User) next(errorWithCode("The token is invalid!", 401));
  if (user === "Client" || user === "TemporaryUser")
    return next(
      errorWithCode(
        "This is reserved for active trainers only. Please verify your email!",
        401
      )
    );

  return User.findById(payload.id).then(currentUser => {
    if (!currentUser) {
      return next(errorWithCode("User does not exist!", 401));
    }

    request.auth = payload;
    return next();
  });
};
