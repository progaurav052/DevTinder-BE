const express = require("express");
const profileRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { profileEditValidation } = require("../utils/validation");
const {User}=require("../models/user")
const bcrypt=require("bcrypt");


profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    // this is an api which is called usuaaly after getting logged in for fetching my profile
    // Note for this we should not send any req.body --> this can be handled using cookies
    //let just intially see if we are getting the cookie with token back
    // we need to use the cookie parser to read the cookie
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
  //first authentication is done
  // during this the profile of the user is loaded in req.user // whole profile
  // we can edit this req.user obj feild and store this in db finally

  // have to define which feilds are allowed for updates
  // not allowed to update email , password ,gender
  try {
    const loggedinUser = req.user;
    //req.user is user that we got from database , this is reference to the actual document
    console.log(loggedinUser);
    if (profileEditValidation(req)) {
      Object.keys(req.body).forEach((key) => {
        loggedinUser[key] = req.body[key];
      });
      res.send(loggedinUser);
      await loggedinUser.save();
      // if the reference to that actual doc it will update and save the doc
      // else it will create an new doc
    } else {
      throw new Error("Updating the specified feild is not valid !!!");
    }
  } catch (error) {
    res.status(400).send("Error !!!:" + error.message);
  }
});

profileRouter.patch("/profile/resetPwd",async (req,res)=>{
  // in the req.body i will send email , oldpwd , newpwd ;
  // will find the user based on email id 
const {emailId,oldPassword,newPassword}=req.body;
  try {
    const user = await User.findOne({emailId:emailId});
    if(!user)
    {
      throw new Error("Invalid Credentials ,cannot reset passowrd !!!");
    }
    else{
      //try and match password
      const isPwdMatch=await user.isPasswordCorrect(oldPassword);
      if(isPwdMatch)
      {
        newHashedPassword= await bcrypt.hash(newPassword,10);
        user.password=newHashedPassword;
        /*
        If you want to use bracket notation, you need to pass the property name as a string:

javascript
Copy
user['password'] = newHashedPassword;
        */
        await user.save();
        res.send("Password reset successfull");


      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
  

})

module.exports = {
  profileRouter,
};
