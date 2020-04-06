const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("mongoUri");

module.exports = connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("db is connected ...");
  } catch (err) {
    console.error(err);
  }
};
