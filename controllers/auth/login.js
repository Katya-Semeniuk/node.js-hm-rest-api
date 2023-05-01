const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // const comparedPassword = bcrypt.compare(password, user.password);

  // if (!user || !comparedPassword) {
  //   throw HttpError(401, "Email or password is wrong");
  // }
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    console.log("Error comparedPassword");
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
