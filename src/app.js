const express = require("express");
//i saw from the express code it is exporting something called createapplication function
const app = express();
//here we are creating that server application and referencing it to app
//example for multiple route handlers

app.get("/admin/getAllUser",(req,res)=>{
   console.log("Admin Auth started");
   const token ="xyz";
   const isAuthorized = token === "xyzvb";
   if(!isAuthorized)
   {
    res.status(401).send("Wrong admin credentials");
   }
   else{
    console.log("Admin authenticated..")
    res.send("Sent All Users Data...");

   }

})
app.get("/admin/DeleteUser",(req,res)=>{
  console.log("Admin Auth started");
  const token ="xyz";
   const isAuthorized = token === "xyzvb";
   if(!isAuthorized)
   {
    res.status(401).send("Wrong admin credentials");
   }
   else{
    console.log("Admin authenticated...");
    res.send("User Data Deleted by Admin...");

   }

})

app.listen(3000, () => {
  console.log("Server up and running on port 3000");
});
