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
      if (fromUserId == toUserId) {
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
        message: "Connection sent Successfully!!",
        savedConrequest,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
module.exports = {
  requestRouter,
};
