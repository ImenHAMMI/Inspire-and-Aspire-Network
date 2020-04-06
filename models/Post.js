const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  name: String,

  avatar: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", postSchema);
