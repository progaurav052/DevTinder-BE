const validator = require("validator");

const signUpValidation = (req) => {
  //this is redudandant API validation
  //using this for signup
  const { firstName, lastName, emailId, password } = req.body;
  //i have to validate this fields
  if (!firstName || !lastName) {
    throw new Error("Specify firstname and Lastname !!");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email !!!");
  }
};

const profileEditValidation = (req) => {
  //this is redudandant API validation
  //using this for signup
  const allowedUpdates = [
    "firstName",
    "lastName",
    "age",
    "profileurl",
    "skills",
  ];
  // .every -> can be used to short circuit
  const isAllowedUpdate = Object.keys(req.body).every((field) =>
    allowedUpdates.includes(field)
  );
  return isAllowedUpdate;
};

module.exports = {
  signUpValidation,
  profileEditValidation,
};
