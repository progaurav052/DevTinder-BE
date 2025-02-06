//express is framework
const express = require("express");
// it is like we are creating an reference for function creating server application
const mongoose = require("mongoose");
const { User } = require("./models/user");
const { connectDB } = require("./config/database");
const { ReturnDocument } = require("mongodb");
const { isValidated } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {UserAuth}=require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());
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
    console.log("Database connection Not Successfull!!!" + err.message);
  });
/*
// for finding and updating
//working
app.patch("/user/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  console.log(userId);
  const data = req.body;
  // adding an api validation to allow only specific feild updates

  try {
    // we have to find a record and update it
    //using findbyID
    const allowedUpdates = ["skills", "gender", "profileurl", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update of the specified field not allowed!!");
    }
    if (data?.skills?.length > 10) {
      throw new Error(
        "skills length should be less than 10, Add only relevant skills according to JD"
      );
    }

    const updated_doc = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updated_doc) {
      res.status(404).send("Document to update not found!!");
    } else {
      res.send(updated_doc);
    }
  } catch (error) {
    //coding error
    res.status(400).send("Error Updating User:" + error.message);
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
    res.status(400).send("Error while deleting user" + error.message);
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
    res.status(400).send("error while fetching the users " + error.message);
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
    res
      .status(400)
      .send("error while getting details of the user " + err.message);
  }
});
*/


app.get("/profile",UserAuth, async (req, res) => {
  try {
    // this is an api which is called usuaaly after getting logged in for fetching my profile
    // Note for this we should not send any req.body --> this can be handled using cookies
    //let just intially see if we are getting the cookie with token back
    // we need to use the cookie parser to read the cookie
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/SendConRequest",UserAuth,async(req,res)=>{
  try {
    res.send("Connection request sent successfully!!!");
  } catch (error) {
    res.status(400).send("Something Went Wrong!!!");
  }
})
// POST API --> to store data in DB
//working
app.post("/login", async (req, res) => {
  try {
    //our login logic will be based on email and password
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      // if we dont send email and pass in re.body and if we leave it empty to handle this
      throw new Error("Enter both EmailId and password");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.send("invalid Credentials!!!");
    } else {
      //we have found the email sent from body
      //match the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        // if password is valid --> login is successfull and we need to store session of the user
        // this can be done using cookies and jwt
        //this jwt will be inside the cookies and will be sent with every api call of that user once he is logged in
        //dummy token creation
        //const token="bbjasbbadslfhpfjdsffbdsidsofi";
        //name //value of the token
        //res.cookie("token",token);
        // we need to generate a token which should have should not have sensitive data such as email or pwd
        // it should also be usefull to fetch the user profile from the data set in token -- we need such data in token
        // id will be encrypted and stores in token
        const token = jwt.sign({ _id: user._id }, "Dev@123Tinder$5");
        console.log(token);
        res.cookie("token", token);
        res.send("Logged in Successfully!!!");
      } else {
        res.send("Invalid Credentials");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});
app.post("/signup", async (req, res) => {
  // validation of data should happen first
  // dont write validation code here -- Make use of helper function which we can call
  try {
    isValidated(req);
    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;

    //encrypt the password and store it
    //use bcrypt
    const hashpwd = await bcrypt.hash(password, 10);
    const newuser = new User({
      firstName,
      lastName,
      emailId,
      password: hashpwd, // storing hash pwd
      age,
      gender,
      skills,
    });

    await newuser.save(); // a new doc will be saved in the collection after this
    //schema level validation will be checked during this
    res.send("New User added Successfully !!!");
  } catch (err) {
    // if data validation is not met this will be triggered also
    res.status(400).send("Error Saving the user:" + err.message);
  }
});
