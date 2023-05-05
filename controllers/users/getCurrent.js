const { HttpError } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  if (!email) {
    throw HttpError(401);
  }
  res.status(200).json({ email, subscription });
};

module.exports = getCurrent;
