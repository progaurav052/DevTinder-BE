const express = require("express");
//i saw from the express code it is exporting something called createapplication function
const app = express();
//here we are creating that server application and referencing it to app
//example for multiple route handlers

app.use("/admin",(req,res,next)=>{
  console.log("Admin Auth started");
  const token ="xyz";
  const isAuthorized = token === "xyz";
  if(!isAuthorized)
  {
   res.status(401).send("Wrong admin credentials");
  }
  else{
   next();
  }
})

app.get("/admin/getAllUser",(req,res)=>{

    res.send("Sent All Users Data...");

})
app.get("/admin/DeleteUser",(req,res)=>{
  
    res.send("User Data Deleted by Admin...");

})

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
