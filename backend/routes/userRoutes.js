// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/usercontroller");

/**
 * @route   POST /api/users/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", signup);

/**
 * @route   POST /api/users/signin
 * @desc    Authenticate a user & get token
 * @access  Public
 */
router.post("/signin", signin);

module.exports = router;
