const express = require("express");
const  requestRouter = express.Router();
const {UserAuth}= require("../middlewares/auth");

requestRouter.get("/SendConRequest", UserAuth, async (req, res) => {
    try {
      res.send("Connection request sent successfully!!!");
    } catch (error) {
      res.status(400).send("Something Went Wrong!!!");
    }
  });

module.exports={
    requestRouter,
}