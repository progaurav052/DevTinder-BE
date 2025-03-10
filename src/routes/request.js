const express = require("express");
const requestRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const { User } = require("../models/user");

//API to send connection reqquest - > right swipe of tinder

requestRouter.post(
  "/request/send/:status/:toUserId",
  UserAuth,
  async (req, res) => {
    try {
      // make sure this api is only for :interested and :notinterested --> cannot use accepted for status
      // have made use of same API for ignore and accept case
      const fromUserId = req.user._id; //logged in user
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["notinterested", "interested"];

      // @API Validation 1- for statuus
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Not a valid status for request..",
        });
        // without return the code will execute down
        // use return / throw new error
      }
      // @ API Validation 3: self to self request also not allowed
      if (fromUserId.equals(toUserId)) {
        return res.status(400).json({
          messsage: "Invalid connection request ... self request not valid..",
        });
      }

      // @ API Validation 2- not allow duplicate requests and also A->B if already there ,B->A not allowed
      // use mongoose methods for this . findOne
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Already existing connection request found..",
        });
      }

      // API Validation 4 : send requests to only those who are there in DB ... not any random user id which does not exists
      // attackers can just use this to dump our DB with invalid data ...
      const toUserExists = await User.findById(toUserId);
      if (!toUserExists) {
        return res.status(400).json({
          message: "Invalid request connection ... no user found",
        });
      }

      const conRequest = new ConnectionRequest({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });

      const savedConrequest = await conRequest.save();

      res.json({
        message: "Connection request sent Successfully!!!",
        savedConrequest,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  UserAuth,
  async (req, res) => {
    // once the user is logged in , he will be inside req.user

    try {
      const loggedInUser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId; // this is id corresponfing to each conRequest stored in DB
      const allowedStatus = ["accepted", "rejected"];

      // API Validation -1
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("Invalid status of conRequest...!!");
      }

      // API validation -2 // the request must exist in DB in interested form
      const conRequestExist = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!conRequestExist) {
        return res
          .status(404)
          .send("No ConRequest found , to be approved ....");
      }

      // if such request is waiting for acceptance , than change the status of it and save in DB;
      conRequestExist.status = "accepted";
      const data = await conRequestExist.save();
      res.status(200).json({
        message: "connection request accepted !!!",
        data,
      });
    } catch (error) {
      res.status(400).send(error.message);

    }
  }
);

module.exports = {
  requestRouter,
};
