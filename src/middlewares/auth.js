const jwt=require("jsonwebtoken");
const {User}=require("../models/user");

// adding an middleware which will take care of storing user session and safety of APi once logged in 
const UserAuth = async(req,res,next) =>{
  //once the user is logged in an jwt willbe created and sent in a coookie of res.send() of /login\
  
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Login first to get Profile!!");
    }

    // we have to fetch the correct profile for this
    const decod_msg = jwt.verify(token, "Dev@123Tinder$5");
    console.log(decod_msg);
    const { _id } = decod_msg;
    if (!_id) {
      throw new Error("could fecth _id from token!!!");
    }
    const user = await User.findById(decod_msg._id);
    req.user=user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
  

}

module.exports = {
  //AdminAuth,// equivalent to AdminAuth:AdminAuth,
  UserAuth,// UserAuth:UserAuth,
};
