const express = require("express");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  "/login",
  validateBody(schemas.logInSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
