const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");
const isAuth = require("../middlewares/passport-setup");
const { registerRules, validator } = require("../middlewares/validator");

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", registerRules(), validator, userController.register);

// @route  GET api/users/login
// @desc   Login user / returning JWT Token
// @access Public
router.post("/login", userController.login);

// @route  GET api/users/current
// @desc   Return current user
//@access  Private
router.get("/current", isAuth(), userController.current);
module.exports = router;
