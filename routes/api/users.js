const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;
