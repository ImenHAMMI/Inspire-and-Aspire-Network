const config = require("config");
// const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");
const secretOrKey = config.get("secretOrKey");

module.exports = postController = {
  getPosts: async (req, res) => {
    const posts = [];
    const avatarsLikes = [];
    try {
      const searchRes = await Post.find();
      // console.log(searchRes);
      if (searchRes) {
        // console.log(searchRes.length);
        for (let i = 0; i < searchRes.length; i++) {
          // console.log(posts);
          // console.log(searchRes[i].likedBy.length);
          for (let j = 0; j < searchRes[i].likedBy.length; j++) {
            // id = searchRes[i].likedBy[j]._id + "";
            // console.log( + "");
            try {
              const searchResUser = await User.findOne({
                _id: searchRes[i].likedBy[j]._id,
              });
              // console.log(searchResUser);
              avatarsLikes.push({
                name: searchResUser.name,
                avatar: searchResUser.avatar,
              });
              // console.log(avatarsLikes);
              posts.push({
                _id: searchRes[i]._id,
                text: searchRes[i].text,
                avatarsLikes,
              });
              console.log(posts);
            } catch (err) {
              res.status(500).json({ msg: "err finding user" });
            }
          }
          return res.status(201).json(searchRes);
          //   .sort({ date: -1 })
        }
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
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
  likePost: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;

    try {
      const searchRes = await Post.findOne({ _id: id });

      if (searchRes.likedBy.indexOf(_id) < 0) {
        searchRes.likedBy.push(_id);

        try {
          const updateResLikes = await Post.findOneAndUpdate(
            { _id: id },
            { $set: { likedBy: searchRes.likedBy } },
            { new: true }
          );
          return res.status(200).json(updateResLikes);
        } catch (error) {
          res.status(500).json({ msg: "error updating data" });
        }
      } else
        return res.status(500).json({ msg: "user already liked your post" });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  unLikePost: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    // console.log(req.params);
    // console.log(req.user);
    try {
      const searchRes = await Post.findOne({ _id: id });
      // console.log(searchRes.likedBy);
      if (searchRes.likedBy.indexOf(_id) >= 0) {
        const filtredLikes = searchRes.likedBy.filter((id) => "" + id != _id);

        try {
          const updateResUnLikes = await Post.findOneAndUpdate(
            { _id: id },
            { $set: { likedBy: filtredLikes } },
            { new: true }
          );
          return res.status(200).json(updateResUnLikes);
        } catch (error) {
          res.status(500).json({ msg: "error updating data" });
        }
      } else
        return res
          .status(500)
          .json({ msg: "You have not yet liked this post" });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  // getAvatarsLikePost: async (req, res) => {
  //   const { id } = req.params;
  //   console.log(req.params);
  //   const searchResUser = null;
  //   const avatarsLikes = [];
  //   try {
  //     const searchRes = await Post.findOne({ _id: id });
  //     console.log(searchRes);
  //     if (searchRes)
  //       for (let i = 0; i < searchRes.likedBy.length(); i++) {
  //         searchResUser = await User.findOne({ _id: searchRes.likedBy[i] });
  //         console.log(searchResUser);
  //         if (searchResUser)
  //           avatarsLikes.push(searchResUser.name, searchResUser.avatar);
  //       }
  //     return res.status(200).json(avatarsLikes);
  //   } catch (err) {
  //     res.status(500).json({ errors: err });
  //   }
  // },
};
