//express is framework
const express = require("express");
// it is like we are creating an reference for function creating server application
const mongoose = require("mongoose");
const { User } = require("./models/user");
const { connectDB } = require("./config/database");
const { ReturnDocument } = require("mongodb");

const app = express();

app.use(express.json());
// it converts json to js object and makes it available in req.body
// this is middleware will be activated for all routes
// middleware to read the json data in the req.body
// because our server is not able to read the json data which is being sent
// express doesnt automatically parse json data , beacuse data can be of any type , json , urlencoded etc ...

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

// for finding and updating
//working
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  console.log(userId);

  try {
    // we have to find a record and update it
    //using findbyID
    const updated_doc = await User.findByIdAndUpdate(
      userId,
      { emailId: "rohit264@gmail.com", password: "rohit264" },
      { returnDocument: "after" }
    );
    if (!updated_doc) {
      res.status(404).send("Document to update not found!!");
    } else {
      res.send(updated_doc);
    }
  } catch (error) {
    //coding error
    res.status(400).send("Error Updating User:"+ error.message);
  }
});

//working
app.delete("/user", async (req, res) => {
  //here we will use find by email and delete
  //we can use findByID also
  //we will use findone
  const userEmail = req.body.emailId;
  try {
    const deleted_doc = await User.findOneAndDelete({ emailId: userEmail });
    if (!deleted_doc) {
      res.status(404).send("document to delete not found !!!");
    } else {
      res.send(`Deleted Document is :${deleted_doc}`);
    }
  } catch (error) {
    // coding error
    res.status(400).send("Error while deleting user"+error.message);
  }
});

// Feed API --> Get all users
//working
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No Users found till now !!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    //coding error
    res.status(400).send("error while fetching the users "+ error.message);
  }
});

//GET API - > to get specific user
//working
app.get("/user", async (req, res) => {
  // we use the Model for Crud operations
  const userEmail = req.body.emailId;

  try {
    //find will return array of users which match emailID
    const found_user = await User.findOne({ emailId: userEmail });
    if (!found_user) {
      res.send("User Not found!!!");
    } else {
      res.send(found_user);
    }
  } catch (err) {
    // this is to handle coding error
    res.status(400).send("error while getting details of the user "+ err.message);
  }
});

// POST API --> to store data in DB
//working
app.post("/signup", async (req, res) => {
  /*
  const userObject = {
    firstName: "Rohit",
    lastName: "Sharma",
    emailId: "rohitcwc@gmail.com",
    password: "rohit@123",  
    // here we used key value pair 
    // in json even the key is an string "<>"
  }
  
  */

  const newuser = new User(req.body);
  try {
    await newuser.save(); // a new doc will be saved in the collection after this
    res.send("New User added Successfully !!!");
  } catch (err) {
    // if data validation is not met this will be triggered also 
    res.status(400).send("Error Saving the user:" + err.message);
  }
});
