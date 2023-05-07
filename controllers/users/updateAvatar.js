const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
// const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarDir, filename);

  // await Jimp.read(tempUpload)
  //   .then((image) => {
  //     return image.resize(250, 250).write(resultUpload);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     throw new Error("Failed to resize the image");
  //   });

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ code: 200, data: avatarURL });
};

module.exports = updateAvatar;
