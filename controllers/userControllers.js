const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretOrKey = config.get("secretOrKey");

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
        avatar: "",
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
        avatar: searchRes.avatar,
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
  current: (req, res) => {
    const { id, name, email } = req.user;
    // res.json(req.user);
    res.json({
      id,
      name,
      email,
    });
  },
};
