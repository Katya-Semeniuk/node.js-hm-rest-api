const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    HttpError(401, "Email or password is wrong");
  }
  const comparedPassword = bcrypt.compare(password, user.password);
  if (!comparedPassword) {
    HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  //   try {
  //     const { id } = jwt.verify(token, SECRET_KEY);
  //     console.log(id);
  //   } catch (err) {
  //     console.log(err.message);
  //   }

  // const decodeToken = jwt.decode(token);
  res.status(200).json({
    token,
    // data: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
