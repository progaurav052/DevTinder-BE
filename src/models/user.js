//Schema - Model creation
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not a valid email!!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      // adding custom validation for gender
      // if anything other than male , female , other is detected dont allow it
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          //we can throw new error which triggerrs catch block
          throw new Error("invalid value of gender");
        }
      },
    },
    profileurl: {
      type: String,
      default:
        "https://media.licdn.com/dms/image/v2/D5603AQHLA3klOeUFHw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725900543881?e=2147483647&v=beta&t=mwFcfCvgiAOdRKTQ2nRaJKxDIlTlRfPkt_tgedKABFE",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photoUrl!!");
        }
      },
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

//userSchema method to bcrypt.compare
//use this when you have something specific to user which is being used inside the .compare / .verify or functions like that

userSchema.methods.isPasswordCorrect = async function (passwordinput) {
  const user = this;
  console.log(user);
  //this order should not be changed...
  const match = await bcrypt.compare(passwordinput, user.password);
  return match;
};

//userSchema method to generate jwt
userSchema.methods.getJWT = async function () {
  const user = this;
  console.log(user)
  const token = await jwt.sign({ _id: user._id }, "Dev@123Tinder$5");
  return token;
};

//now we have to create an model from the above Schema
//model Name should start with Captial
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
