const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");
const Post = require("../models/Post");
const ImgProfile = require("../models/ImgProfile");

const secretOrKey = config.get("secretOrKey");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb) {
//     cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
});
const upload = multer({
  storage: storage,
}).single("myImage");

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
// }).single("myImage");

module.exports = userController = {
  register: async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const searchRes = await User.findOne({ email });
      if (searchRes)
        return res.status(400).json({ msg: "User already exists !" });

      const newUser = new User({
        email,
        password,
        name,
        role: "user",
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          try {
            const addRes = await newUser.save();
            res.status(200).json(addRes);
          } catch (err) {
            res.status(500).json({ errors: error });
          }
        });
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchRes = await User.findOne({ email });
      if (!searchRes) return res.status(400).json({ msg: "User not found" });
      const ismatch = await bcrypt.compare(password, searchRes.password);
      if (!ismatch) return res.status(400).json({ msg: "Password incorrect" });

      const payload = {
        id: searchRes._id,
        email: searchRes.email,
        name: searchRes.name,
      }; // create jwt payload

      jwt.sign(payload, secretOrKey, (err, token) => {
        if (err) throw err;
        res.json({ token: `Bearer ${token}` });
      });
    } catch (err) {
      // console.error(err);
      res.status(500).json({ msg: err });
    }
  },
  current: async (req, res) => {
    const { id, name, email, followers, following } = req.user;

    try {
      const searchResImg = await ImgProfile.findOne({ avatar: id }).sort({
        createdAt: "desc",
      });
      // console.log(posts);
      return res.status(201).json({
        id,
        name,
        email,
        avatar: searchResImg,
        followers,
        following,
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const searchRes = await User.find();
      if (searchRes) {
        const avatarsLikesImg = [];
        for (let index = 0; index < searchRes.length; index++) {
          const { _id, name } = searchRes[index];
          const searchResImgProfile = await ImgProfile.findOne({
            avatar: _id,
          })
            .populate({ path: "avatar", select: "name", model: User })
            .sort({
              createdAt: "desc",
            });
          if (searchResImgProfile) avatarsLikesImg.push(searchResImgProfile);
          else avatarsLikesImg.push({ avatar: { _id, name } });
        }

        return res.status(201).json(avatarsLikesImg);
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  getProfileByID: async (req, res) => {
    const { id } = req.params;
    try {
      const searchRes = await User.findOne({ _id: id });
      if (searchRes) {
        const { _id, name, email, followers, following } = searchRes;

        const searchResImg = await ImgProfile.findOne({ avatar: id }).sort({
          createdAt: "desc",
        });

        return res.status(201).json({
          id: _id,
          name,
          email,
          avatar: searchResImg,
          followers,
          following,
        });
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  editProfile: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const updateRes = await User.findOneAndUpdate(
        { _id: id },
        { $set: { name, email } },
        { new: true }
      );
      return res.status(200).json(updateRes);
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  uploadImg: async (req, res) => {
    const { _id } = req.user;
    try {
      upload(req, res, (err) => {
        if (err) return res.status(400).json({ errors: err });
        // console.log("Request ---", req.body);
        // console.log("Request file ---", req.file); //Here you get file.
        // const new_img = new ImgProfile();
        let img = fs.readFileSync(req.file.path);
        let encode_image = img.toString("base64");
        // new_img.img.data = Buffer.from(encode_image, "base64");
        // new_img.img.contentType = req.file.mimetype;
        // new_img.avatar = _id;
        let finalImg = {
          contentType: req.file.mimetype,
          data: Buffer.from(encode_image, "base64"),
        };
        // new_img.save();
        // console.log(new_img);
        res.status(200).json({ img: finalImg, avatar: _id });
        /**message: "New image added to the db!", */
        /*Now do where ever you want to do*/
        // // Define a JSONobject for the image attributes for saving to database
      });
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  editAvatar: async (req, res) => {
    const { avatar, img } = req.body;

    try {
      const new_img = new ImgProfile({
        img,
        avatar,
      });

      const addRes = await new_img.save();
      res.status(200).json(addRes);
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
  follow: async (req, res) => {
    const { id } = req.params;
    const { _id, name, email, avatar, followers, following } = req.user;

    try {
      // console.log(following);
      const searchRes = await User.findOne({ _id: id });
      if (searchRes) {
        if (following.indexOf(searchRes._id) < 0) {
          following.push(searchRes);
          searchRes.followers.push(req.user);

          try {
            const updateResfollowing = await User.findOneAndUpdate(
              { _id },
              { $set: { following } },
              { new: true }
            );
            const updateResfollowers = await User.findOneAndUpdate(
              { _id: id },
              { $set: { followers: searchRes.followers } },
              { new: true }
            );
            const searchResPost = await Post.find({ postedBy: id });
            return res.status(200).json([
              {
                id: _id,
                name,
                email,
                avatar,
                followers,
                following: updateResfollowing.following,
              },
              {
                id,
                name: updateResfollowers.name,
                email: updateResfollowers.email,
                avatar: updateResfollowers.avatar,
                followers: updateResfollowers.followers,
                following: updateResfollowers.following,
                posts: searchResPost,
              },
            ]);
          } catch (error) {
            // console.log("error :", error);
            res.status(500).json({ msg: "error updating data" });
          }
        } else return res.status(500).json({ msg: "following does exist" });
      }
    } catch (err) {
      res.status(500).json({ errors: err });
    }
  },
};
