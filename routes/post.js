const express = require("express");
const router = express.Router();

const postController = require("../controllers/postControllers");
const isAuth = require("../middlewares/passport-setup");
// const { registerRules, validator } = require("../middlewares/validator");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
