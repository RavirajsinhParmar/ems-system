const { Login, updateProfile } = require("../Controllers/Login.js");
const { Signup } = require("../Controllers/Signup.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.patch("/update-profile", verifyToken, updateProfile);

module.exports = router;
