const express = require("express");

const { login, logout, signup } = require("../controllers/AuthController");
const { signupValidator, loginValidator } = require("../middlewares/validators/UserSchema");

const router = express.Router();

router.post("/login", loginValidator, login);
router.post("/signup", signupValidator, signup);
router.post("/logout", logout);

module.exports = router;