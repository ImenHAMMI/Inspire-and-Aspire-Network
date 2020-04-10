const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  role: ["user", "admin"],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", userSchema);
