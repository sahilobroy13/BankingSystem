const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controllers");
const authenticateUser = require("../middlewares/authenticateUser");

/**
 * - POST api/account/
 * - Account Create
*/
router.post("/",authenticateUser,accountController.createAccountController);


module.exports = router;