const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatetAt");
  res.json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = getAll;
