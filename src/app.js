const express = require("express");
const { connectDB } = require("./config/database"); // this will use the concept of IIFE and will run the cluster/database connection code
const {User} = require("./models/user");

//i saw from the express code it is exporting something called createapplication function
const app = express();
//here we are creating that server application and referencing it to app

//create an api to add user 
// POST method

app.post("/signup", async (req,res)=>{
  //dummy data
  const userObj ={
    firstName:"Virat",
    lastName :"Kohli",
    emailId : "virat18kohli@gmail.com",
    password : "virat@123"
  }
  //creating a new instance of the User Model syntax 
  const user = new User(userObj);

  //saving , this will return a promise  
  await user.save();

  res.send("user added succesfully");

})



connectDB()
  .then(() => {
    console.log("Database connected successfully");
    //this is the correct way of writing code..
    //it may happen in some case that database is not connected but you application to accepting API .... this is wrong
    // always connect to DB first , than do app.listen for api...

    app.listen(3000, () => {
      console.log("Server up and running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });


