const mongoose = require("mongoose");
const config = require("config");

// original code

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(config.get("Db_Connection_String"));
    console.log("Database is Connected");
    console.log("Host : ", connect.connection.host);
    console.log("DB Name : ", connect.connection.name);
  } catch (err) {
    console.log("Database is not connected.");
    console.log("Error: ", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;