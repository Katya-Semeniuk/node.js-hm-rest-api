const contactOperations = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contactOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await contactOperations.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  // res.send("GET BY ID");
  const { id } = req.params;
  // if (!id) {
  //   throw HttpError(400, "Invalid contact id");
  // }
  const result = await contactOperations.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with id= ${id} not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id= ${id} not found`);
  }
  res.status(200).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
