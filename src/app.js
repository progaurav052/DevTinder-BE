//express is framework
const express = require("express");
// it is like we are creating an reference for function creating server application
const mongoose = require("mongoose");
const { User } = require("./models/user");
const { connectDB } = require("./config/database");

const app = express();

connectDB()
  .then(() => {
    console.log("Connected to Database successfully!!!");
    //than we can do server up / app listen
    //once db is up and running , start listening
    app.listen(7777, () => {
      console.log("Server up and running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection Not Successfull!!!");
  });

app.post("/signup", async (req, res) => {
  const userObject = {
    firstName: "Rohit",
    lastName: "Sharma",
    emailId: "rohitcwc@gmail.com",
    password: "rohit@123",
  };

  const newuser = new User(userObject);
  await newuser.save();
  res.send("new User Added Successfully !!!");
});

//start our server to listen on port
