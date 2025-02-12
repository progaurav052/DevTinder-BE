const express = require("express");
const profileRouter = express.Router();
const {UserAuth}= require("../middlewares/auth")


profileRouter.get("/profile", UserAuth, async (req, res) => {
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


  module.exports={
    profileRouter,

  }