//express is framework
const express = require("express");
// it is like we are creating an reference for function creating server application
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const {authRouter} = require("./routes/auth");
const {profileRouter}= require("./routes/profile");
const {requestRouter}= require("./routes/request");


const app = express();

app.use(express.json());// middleware to make req.body data available
app.use(cookieParser()); // middleware to make cookie available to read;


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


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
