const express = require("express");
const router = express.Router();

const postController = require("../controllers/postControllers");
const isAuth = require("../middlewares/passport-setup");
// const { registerRules, validator } = require("../middlewares/validator");

// @route   GET /posts
// @desc    Get posts
// @access  Private
router.get("/posts", postController.getPosts);

// @route   POST /post
// @desc    Create post
// @access  Private
router.post("/addpost", isAuth(), postController.addPost);

// @route   POST /post/like/:id
// @desc    Like post
// @access  Private
router.put("/likePost:id", isAuth(), postController.likePost);

// @route   POST /post/unlike/:id
// @desc    Unike post
// @access  Private
router.put("/unlikePost:id", isAuth(), postController.unLikePost);

// @route   POST /post/getAvatarLikes/:id
// @desc    Get Avatar Likes
// @access  Private
// router.get("/getAvatarsLike:id", postController.getAvatarsLikePost);

module.exports = router;
