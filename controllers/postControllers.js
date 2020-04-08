const config = require("config");
// const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

const secretOrKey = config.get("secretOrKey");

module.exports = postController = {
  // getPosts: async (req, res) => {
  //   try {
  //     const searchRes = await Post.find();
  //     if (searchRes) return res.status(201).json(searchRes);
  //     //   .sort({ date: -1 })
  //   } catch (err) {
  //     res.status(500).json({ errors: err });
  //   }
  // },
  addPost: async (req, res) => {
    const { text, name, avatar } = req.body;

    const newPost = new Post({
      text,
      name,
      avatar,
      postedBy: req.user.id,
    });
    try {
      const addRes = await newPost.save();
      res.status(200).json(addRes);
    } catch (err) {
      res.status(500).json({ errors: "errrroooor" });
    }
  },
};
