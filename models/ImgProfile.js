const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImgProfile = new Schema(
  {
    img: { data: Buffer, contentType: String },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ImgProfile", ImgProfile);
