const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");

const filteredFavorite = async (req, res) => {
  const { favorite } = req.query;
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner }, "-createdAt -updatetAt");
  console.log(result);

  if (!result) {
    throw HttpError(404);
  }

  const filteredFavoriteContacts = result.filter(
    (contact) => contact.favorite === favorite
  );

  console.log(filteredFavoriteContacts);

  res.status(200).json({
    status: "success",
    filteredFavoriteContacts,
  });
};

module.exports = filteredFavorite;
