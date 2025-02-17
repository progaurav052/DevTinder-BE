const mongoose = require("mongoose");
const {User}= require("./user");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId, // this is for _id
      required: true,
      ref :"User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId, // this is for _id
      required: true,
      ref :"User"
    },
    status: {
      type: String,
      required: true,
      enum: {
        //enum restriccts what value user can give
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is not valid status type for request`, //custom error message ~ similr to validator
      },
    },
  },
  {
    timestamps: true,
  }
);

//compound index   // 1 -> asc order , -1 -> des order
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // fasten query which uses this both , like the one query which we have used

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = {
  ConnectionRequest,
};
