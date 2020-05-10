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
          path: "postedBy likedBy comments.user",
          select: "name",
          model: User,
        });

        if (searchResPost) {
          for (let j = 0; j < searchResPost.length; j++) {
            const avatarsLikesImg = [];
            const avatarsCommentsImg = [];
            const {
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments,
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

            //comments with img and name user
            for (let k = 0; k < comments.length; k++) {
              const { text, user, date } = comments[k];
              const searchResImgProfile = await Imgprofile.findOne({
                avatar: comments[k].user,
              })
                // .populate({ path: "avatar", select: "name", model: User })
                .sort({
                  createdAt: "desc",
                });
              avatarsCommentsImg.push({
                avatarImg: searchResImgProfile,
                name: user.name,
                text,
                date,
              });
              // console.log(avatarsCommentsImg);
            }
            posts.push({
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments: avatarsCommentsImg,
              avatarsLikesImg,
            });
          }
        }
        for (let i = 0; i < searchRes.following.length; i++) {
          const searchResPost = await Post.find({
            postedBy: searchRes.following[i]._id,
          }).populate({
            path: "postedBy likedBy comments.user",
            select: "name",
            model: User,
          });
          for (let j = 0; j < searchResPost.length; j++) {
            const avatarsLikesImg = [];
            const avatarsCommentsImg = [];

            const {
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments,
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
            //comments with img
            for (let k = 0; k < comments.length; k++) {
              const { text, user, date } = comments[k];
              const searchResImgProfile = await Imgprofile.findOne({
                avatar: comments[k].user,
              })
                // .populate({ path: "avatar", select: "name", model: User })
                .sort({
                  createdAt: "desc",
                });
              avatarsCommentsImg.push({
                avatarImg: searchResImgProfile,
                name: user.name,
                text,
                date,
              });
            }
            posts.push({
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments: avatarsCommentsImg,
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
  getPostsById: async (req, res) => {
    const posts = [];
    const { id } = req.params;
    try {
      const searchRes = await User.findOne({ _id: id });
      if (searchRes) {
        const searchResPost = await Post.find({ postedBy: id }).populate({
          path: "postedBy likedBy comments.user",
          select: "name",
          model: User,
        });
        if (searchResPost) {
          for (let j = 0; j < searchResPost.length; j++) {
            const avatarsLikesImg = [];
            const avatarsCommentsImg = [];
            const {
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments,
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
            //comments with img
            for (let k = 0; k < comments.length; k++) {
              const { text, user, date } = comments[k];
              const searchResImgProfile = await Imgprofile.findOne({
                avatar: comments[k].user,
              })
                // .populate({ path: "avatar", select: "name", model: User })
                .sort({
                  createdAt: "desc",
                });
              avatarsCommentsImg.push({
                avatarImg: searchResImgProfile,
                name: user.name,
                text,
                date,
              });
            }
            posts.push({
              _id,
              postedBy,
              title,
              quote,
              text,
              date,
              likedBy,
              comments: avatarsCommentsImg,
              avatarsLikesImg,
            });
          }
        }
        return res.status(201).json(posts.sort((a, b) => b.date - a.date));
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  addPost: async (req, res) => {
    const { title, text, quote } = req.body;
    const { id, name } = req.user;

    const newPost = new Post({
      title,
      quote,
      text,
      postedBy: req.user.id,
    });
    try {
      const addRes = await newPost.save();
      const { _id, date, likedBy } = addRes;

      res.status(200).json({
        _id,
        title,
        text,
        quote,
        date,
        likedBy,
        postedBy: { _id: id, name: name },
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  editPost: async (req, res) => {
    const { id } = req.params;
    const { title, text, quote } = req.body;

    try {
      const updateRes = await Post.findByIdAndUpdate(
        { _id: id },
        { $set: { title, text, quote } },
        { new: true }
      );

      res.status(201).json(updateRes);
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const updateRes = await Post.findOneAndDelete({ _id: id });
      res.status(201).json(updateRes);
    } catch (err) {
      res.status(500).json({ errors: err });
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
            postedBy,
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
            postedBy,
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
  addComment: async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    const { text } = req.body;
    try {
      const searchRes = await Post.findOne({ _id: id }).populate({
        path: "postedBy",
        select: "name",
        model: User,
      });
      searchRes.comments.push({ user: _id, text });

      const updateResComments = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { comments: searchRes.comments } },
        { new: true }
      );

      const searchResImgProfile = await Imgprofile.findOne({
        avatar: _id,
      }).sort({
        createdAt: "desc",
      });

      res.status(200).json({
        idPost: id,
        text,
        name: searchRes.postedBy.name,
        avatarImg: searchResImgProfile,
        date:
          updateResComments.comments[updateResComments.comments.length - 1]
            .date,
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
};
