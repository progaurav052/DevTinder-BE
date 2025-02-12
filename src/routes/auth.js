const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { isValidated } = require("../utils/validation");

authRouter.post("/login", async (req, res) => {
  try {
    //our login logic will be based on email and password
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      // if we dont send email and pass in re.body and if we leave it empty to handle this
      throw new Error("Enter both EmailId and password");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.send("invalid Credentials!!!");
    } else {
      //we have found the email sent from body
      //match the password
      //User Schema method Usage
      const isPasswordValid = await user.isPasswordCorrect(password);
      if (isPasswordValid) {
        //user schema method usage
        const token = await user.getJWT();
        console.log(token);
        res.cookie("token", token);
        res.send("Logged in Successfully!!!");
      } else {
        res.send("Invalid Credentials");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  // validation of data should happen first
  // dont write validation code here -- Make use of helper function which we can call
  try {
    isValidated(req); // help
    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;

    //encrypt the password and store it
    //use bcrypt
    const hashpwd = await bcrypt.hash(password, 10);
    const newuser = new User({
      firstName,
      lastName,
      emailId,
      password: hashpwd, // storing hash pwd
      age,
      gender,
      skills,
    });

    await newuser.save(); // a new doc will be saved in the collection after this
    //schema level validation will be checked during this
    res.send("New User added Successfully !!!");
  } catch (err) {
    // if data validation is not met this will be triggered also
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logged out successfully");
});

module.exports = {
  authRouter,
};
