const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const USER_SAFE_DATA = "firstName lastName age gender skills";
const {User} = require("../models/user");

userRouter.get("/user/requestreceived", UserAuth, async (req, res) => {
  // api is to get all the requests that are recived by the user that is logged in
  // interested requests
  try {
    const loggedInUser = req.user;
    //array of requests if exists
    const reqreceived = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // will poopulate the fromUserId feild in the result
    //just along with id send user details who has sent request
    if (!reqreceived.length) {
      return res.status(404).send("No pending Connection request found !!!");
    }
    const data = reqreceived.map((row) => {
      return row.fromUserId;
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
userRouter.get("/user/connections", UserAuth, async (req, res) => {
  //all connections
  // which user sent -> accepted , which were accepted by user
  try {
    const loggedInuser = req.user;
    const conrequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInuser._id }, { toUserId: loggedInuser._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    //here we need to be carefull by the above population it may display the deatils of user itself again

    console.log(conrequests);
    if (!conrequests.length) {
      return res.status(404).send("User does not have any connections!!!");
    }
    const data = conrequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInuser._id.toString()) {
        //  this will compare string within object_id
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(400).json({data});
  } catch (error) {
    res.status(400).send(error.message);
  }
});
userRouter.get("/user/feed", UserAuth, async (req, res) => {
  //api to display feed of users to logged in User
  try {
    const loggedInUser = req.user;
    // we need to get all those users which are not related to user till now
    //either the user has not ignored or accepted , showed interest till now
    // sol : All users - users in which user has showed interest/realted
    const conrequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId"); //from each of those docs select only id
    // [{},{},{}]

    const hashSetUsers = new Set();
    conrequests.forEach((req) => {
      hashSetUsers.add(req.fromUserId);
      hashSetUsers.add(req.toUserId);
    });

    const feedData = await User.find({
      $and :[
        { _id: { $nin: Array.from(hashSetUsers) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    }
      
    ).select(USER_SAFE_DATA);
    // this will give us our expected users
    res.status(200).json( feedData );
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = {
  userRouter,
};
