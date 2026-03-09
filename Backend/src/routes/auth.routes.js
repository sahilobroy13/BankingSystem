const express = require("express");
const authController = require("../controllers/auth.controllers")

const router = express.Router();

/** 
 * - POST api/auth/register
 * - Register Route
 *  */

router.post("/register", authController.registerController);

/**
 * - POST api/auth/login
 * - Login Route
 */

router.post("/login", authController.loginController);

module.exports= router;