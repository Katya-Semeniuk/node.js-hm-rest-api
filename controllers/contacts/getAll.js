const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { page = 1, limit = 1 } = req.query;

  const skip = (page - 1) * limit;

  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updatetAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.status(200).json({
    result,
  });
};

module.exports = getAll;
