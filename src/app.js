const express = require("express");
//i saw from the express code it is exporting something called createapplication function
const app = express();
//here we are creating that server application and referencing it to app
//example for multiple route handlers
const { AdminAuth, UserAuth } = require("./middlewares/auth");

app.use("/admin", AdminAuth);
// we can explicity make this middlewares available to the api calls

app.get("/user/login", UserAuth, (req, res) => {
  //here we used the concept of middlewares as multiple route handlers...
  //middlwares ~ route handlers
  res.send("User ops performed successfully");
});
app.post("/user/post-data", UserAuth, (req, res) => {
  res.send("User posted data successfully");
});
app.post("/user/register", (req, res) => {
  res.send("user registered !!! , welcome...");
});

app.get("/admin/getAllUser", (req, res) => {
  res.send("Sent All Users Data...");
});
app.get("/admin/DeleteUser", (req, res) => {
  res.send("User Data Deleted by Admin...");
});

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
