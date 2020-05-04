const Post = require("../models/Post");
const User = require("../models/User");
const Imgprofile = require("../models/ImgProfile");

module.exports = postController = {
  getPosts: async (req, res) => {
    const posts = [];
    const { _id } = req.user;

    try {
      const searchRes = await User.findOne(_id);
      if (searchRes) {
        const searchResPost = await Post.find({ postedBy: _id }).populate({
          path: "postedBy likedBy",
          select: "name",
          model: User,
        });
        if (searchResPost) {
          for (let j = 0; j < searchResPost.length; j++) {
            const avatarsLikesImg = [];
            const {
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
            } = searchResPost[j];
            for (let k = 0; k < likedBy.length; k++) {
              const searchResImgProfile = await Imgprofile.findOne({
                avatar: likedBy[k]._id,
              })
                .populate({ path: "avatar", select: "name", model: User })
                .sort({
                  createdAt: "desc",
                });
              if (searchResImgProfile)
                avatarsLikesImg.push(searchResImgProfile);
              else avatarsLikesImg.push(likedBy[k].name);
            }

            posts.push({
              _id,
              name: postedBy.name,
              title,
              quote,
              text,
              date,
              likedBy,
              avatarsLikesImg,
            });
          }
        }
        for (let i = 0; i < searchRes.following.length; i++) {
          const searchResPost = await Post.find({
            postedBy: searchRes.following[i]._id,
          }).populate({
            path: "postedBy likedBy",
            select: "name",
            model: User,
          });
          for (let j = 0; j < searchResPost.length; j++) {
            const avatarsLikesImg = [];
            const {
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
            } = searchResPost[j];
            for (let k = 0; k < likedBy.length; k++) {
              const searchResImgProfile = await Imgprofile.findOne({
                avatar: likedBy[k]._id,
              })
                .populate({ path: "avatar", select: "name", model: User })
                .sort({
                  createdAt: "desc",
                });
              if (searchResImgProfile)
                avatarsLikesImg.push(searchResImgProfile);
              else avatarsLikesImg.push(likedBy[k].name);
            }

            posts.push({
              _id,
              name: postedBy.name,
              title,
              quote,
              text,
              date,
              likedBy,
              avatarsLikesImg,
            });
            // console.log(posts);
          }
        }
        // posts.sort({ date: "desc" });
        return res.status(201).json(posts.sort((a, b) => b.date - a.date));
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  addPost: async (req, res) => {
    const { title, text, quote } = req.body;

    const newPost = new Post({
      title,
      quote,
      text,
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
          ).populate({
            path: "postedBy likedBy",
            select: "name",
            model: User,
          });
          const avatarsLikesImg = [];
          const {
            _id,
            postedBy,
            title,
            quote,
            text,
            date,
            likedBy,
          } = updateResLikes;
          for (let k = 0; k < likedBy.length; k++) {
            const searchResImgProfile = await Imgprofile.findOne({
              avatar: likedBy[k]._id,
            })
              .populate({ path: "avatar", select: "name", model: User })
              .sort({
                createdAt: "desc",
              });
            if (searchResImgProfile) avatarsLikesImg.push(searchResImgProfile);
            else avatarsLikesImg.push(likedBy[k].name);
          }

          return res.status(200).json({
            _id,
            name: postedBy.name,
            title,
            quote,
            text,
            date,
            likedBy,
            avatarsLikesImg,
          });
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

    try {
      const searchRes = await Post.findOne({ _id: id });

      if (searchRes.likedBy.indexOf(_id) >= 0) {
        const filtredLikes = searchRes.likedBy.filter((id) => "" + id != _id);

        try {
          const updateResUnLikes = await Post.findOneAndUpdate(
            { _id: id },
            { $set: { likedBy: filtredLikes } },
            { new: true }
          ).populate({
            path: "postedBy likedBy",
            select: "name",
            model: User,
          });
          const avatarsLikesImg = [];
          const {
            _id,
            postedBy,
            title,
            quote,
            text,
            date,
            likedBy,
          } = updateResUnLikes;
          for (let k = 0; k < likedBy.length; k++) {
            const searchResImgProfile = await Imgprofile.findOne({
              avatar: likedBy[k]._id,
            })
              .populate({ path: "avatar", select: "name", model: User })
              .sort({
                createdAt: "desc",
              });
            if (searchResImgProfile) avatarsLikesImg.push(searchResImgProfile);
            else avatarsLikesImg.push(likedBy[k].name);
          }

          return res.status(200).json({
            _id,
            name: postedBy.name,
            title,
            quote,
            text,
            date,
            likedBy,
            avatarsLikesImg,
          });
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
  addComment: async (req, res) => {},
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
