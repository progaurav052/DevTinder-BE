const mongoose = require("mongoose");
//mongoose.connect("mongodb+srv://gaurav511pai:<db_password>@namastenode.8abuz.mongodb.net/");
// connecting to mongoose cluster above is normal /bad way 

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://gaurav511pai:ggpai2024@namastenode.8abuz.mongodb.net/DevTinder");

}// this will return promise 


module.exports ={
    connectDB,
}