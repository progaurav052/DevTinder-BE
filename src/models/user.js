const mongoose = require("mongoose");

const  userSchema = mongoose.Schema({
    firstName :{
        type :String
    },
    lastName:{
        type:String
    },
    emailId : {
        type:String
    },
    password:{
        type:String
    },
    age :{
        type:String
    },
    gender :{
        type : String
    }
});

//after this we create model using this schema 
const User = mongoose.model("User",userSchema);
//model can be thought as of a class , using this model new users are created 


module.exports={
    User,
}