const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("email", "this field is required !").notEmpty(),
  check("email", "this field must have valid email !").isEmail(),
  check("password", "this field require 8 character !").isLength({ min: 8 })
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).json({ errors: errors.array() });
};
