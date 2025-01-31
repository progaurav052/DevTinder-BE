const express = require("express");
//i saw from the express code it is exporting something called createapplication function 
const app =express();
//here we are creating that server application and referencing it to app 

app.get("/user/:UserId",(req,res)=>{
    // for Dynamic calls like /user/7097 ... or anything , searching for particular user
    console.log(req.params);
    console.log(req.query);

    res.send(`fetching details of User : ${req.params}`)
})
app.get("/user",(req,res)=>{
    console.log(req.query);
    //used to fetch query params ..

    res.send({"firstname":"Gaurav","lastname":"Pai"});

})
app.post("/user",(req,res)=>{
    res.send("User Deatils received...storing in database...");

})
app.delete("/user",(req,res)=>{
    res.send("User data deleted...");
})
app.use("/user",(req,res)=>{
    res.send("Redundant response...");

})

app.listen(3000,()=>{
    console.log("Server up and running on port 3000");

});
