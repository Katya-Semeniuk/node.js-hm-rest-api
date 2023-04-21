const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.contactSchema), ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schema.contactSchema), ctrl.updateById);

module.exports = router;
