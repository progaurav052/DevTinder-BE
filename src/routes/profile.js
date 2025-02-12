const express = require("express");
const profileRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { profileEditValidation } = require("../utils/validation");

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
    console.log(loggedinUser)
    if(profileEditValidation(req))
    {
        Object.keys(req.body).forEach(key=>{
           loggedinUser[key]=req.body[key];

        })
        res.send(loggedinUser);
        await loggedinUser.save();
        // if the reference to that actual doc it will update and save the doc 
        // else it will create an new doc 
    


    }
    else
    {
      throw new Error("Updating the specified feild is not valid !!!");
    }


  } catch (error) {
    res.status(400).send("Error !!!:"+error.message);

  }
});

module.exports = {
  profileRouter,
};
