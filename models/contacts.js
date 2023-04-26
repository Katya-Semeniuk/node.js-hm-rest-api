const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(result);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  console.log(contactId);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  console.log(id);
  const data = await listContacts();
  const contactToRemove = data.find((contact) => contact.id === id);
  if (!contactToRemove) {
    return null;
  }
  const filteredContacts = data.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return contactToRemove;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
