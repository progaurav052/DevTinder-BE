// this js file is used to connect to database
const mongoose = require("mongoose");

//short and simple way , but not a good way to handle
//mongoose.connect("mongodb+srv://gaurav511pai:ggpai2024@namastenode.8abuz.mongodb.net/")
// .connect function returns an promise we need to handle it

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gaurav511pai:ggpai2024@namastenode.8abuz.mongodb.net/DevTinder"
  );
};

module.exports = {
  connectDB,
};
