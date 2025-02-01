//Schema - Model creation
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

//now we have to create an model from the above Schema
//model Name should start with Captial
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
