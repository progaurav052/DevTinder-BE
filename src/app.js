const express = require("express");
//i saw from the express code it is exporting something called createapplication function
const app = express();
//here we are creating that server application and referencing it to app
//example for multiple route handlers 

app.get("/user",(req,res,next)=>{
  console.log("Get Request at /User");
  res.send("1st Response");
  next();
  


},
  (req,res)=>{
    console.log("2nd response console");
    res.send("2nd Response");

  }
)

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
