const express = require("express");
//i saw from the express code it is exporting something called createapplication function 
const app =express();
//here we are creating that server application and referencing it to app 

app.use("/test",(req,res)=>{
    res.send("hello, this is test page");

})
app.use("/admin", (req,res)=>{
    res.send("hello, this is admin page");

})

app.use("/checkout", (req,res)=>{
    res.send("hello, this is checkout page");

})

app.use("/edit", (req,res)=>{
    res.send("hello, this is edit page");

})

app.use("/",(req,res)=>{
    res.send("hello , this is Dashboard");

})

app.listen(3000,()=>{
    console.log("Server up and running on port 3000");

});
