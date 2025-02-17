const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const USER_SAFE_DATA="firstName lastName age gender skills"

userRouter.get("/user/requestreceived", UserAuth, async (req, res) => {
  // api is to get all the requests that are recived by the user that is logged in
  // interested requests
  try {
    const loggedInUser = req.user;
    //array of requests if exists
    const data = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId",USER_SAFE_DATA);
    // will poopulate the fromUserId feild in the result 
    //just along with id send user details who has sent request 
    if (data.length == 0) {
      return res.status(404).send("No pending Connection request found !!!");
    }
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  userRouter,
};
