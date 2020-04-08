const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
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
