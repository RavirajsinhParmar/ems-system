const { sendNotifications } = require("../Controllers/Notifications.js");
const { verifyToken } = require("../Middlewares/verifyToken.js");
const router = require("express").Router();

router.get("", verifyToken, sendNotifications);

module.exports = router;
