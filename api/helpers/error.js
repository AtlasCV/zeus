const errorWithCode = (message = "Server error!", code = 500) => {
  const err = new Error(message);
  err.status = code;

  return err;
};

module.exports = errorWithCode;
