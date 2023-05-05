const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw HttpError(401);
  }
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({ message: "logout success" });
};

module.exports = logout;
