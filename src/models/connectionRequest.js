const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,  // this is for _id
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId, // this is for _id 
      required: true,
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

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports={
    ConnectionRequest,
}