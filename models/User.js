const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  role: ["user", "admin"],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", userSchema);
