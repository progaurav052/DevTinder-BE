const express = require("express");
const  requestRouter = express.Router();
const {UserAuth}= require("../middlewares/auth");
const {ConnectionRequest}=require("../models/connectionRequest");


//API to send connection reqquest - > right swipe of tinder 

requestRouter.post("/request/send/:status/:toUserId",UserAuth,async(req,res)=>{

   try {
    const fromUserId = req.user._id;//logged in user
    const toUserId= req.params.toUserId;
    const status=req.params.status;
    // have made use of same API for ignore and accept case 
    
    //create an new instance of connection request model to store an doc 

    const conRequest= new ConnectionRequest({
      fromUserId:fromUserId,
      toUserId:toUserId,
      status:status,
    })

    const savedConrequest= await conRequest.save();

    res.json({
      message:"Connection sent Successfully!!",
      savedConrequest,
    })



   } catch (error) {
    res.status(400).send(error.message);

   }

})
module.exports={
    requestRouter,
}