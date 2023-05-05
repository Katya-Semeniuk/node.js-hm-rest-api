const { Schema, model } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .messages({
      "string.pattern.base":
        "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
    })
    .required(),
  favorite: Joi.boolean(),
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
module.exports = { Contact, schemas };
