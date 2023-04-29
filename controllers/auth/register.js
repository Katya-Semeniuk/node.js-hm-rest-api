const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

// const createHashPassword = async (password) => {
//   const result = await bcrypt.hash(password, 10);
//   console.log(result);
//   const compareResult = await bcrypt.compare(password, result);
// };

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

module.exports = register;
