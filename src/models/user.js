//Schema - Model creation
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    profileurl: {
      type: String,
      default: "Default profile pic",
    },
  },
  { timestamps: true }
);

//now we have to create an model from the above Schema
//model Name should start with Captial
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
