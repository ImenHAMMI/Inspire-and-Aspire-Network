const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const isAuth = require("../middlewares/passport-setup");
const { registerRules, validator } = require("../middlewares/validator");

// @route  GET user/register
// @desc   Register user
// @access Public
router.post("/register", registerRules(), validator, userController.register);

// @route  GET user/login
// @desc   Login user / returning JWT Token
// @access Public
router.post("/login", userController.login);

// @route  GET user/current
// @desc   Return current user
//@access  Private
router.get("/current", isAuth(), userController.current);

// @route  GET user/current
// @desc   Return all users
//@access  Private
router.get("/users", userController.getAllUsers);

// @route  GET user/profile:id
// @desc   Return profile by id
//@access  Private
router.get("/profile:id", userController.getProfileByID);

// @route  PUT user/profile:id
// @desc   Add follow
//@access  Private
router.put("/profile:id", isAuth(), userController.follow);

// @route  PUT user/profile:id
// @desc   Upload image
//@access  Private
router.post("/upload", isAuth(), userController.uploadImg);

// @route  PUT user/profile:id
// @desc   edit avatar
//@access  Private
router.post("/editAvatar", userController.editAvatar);
module.exports = router;
