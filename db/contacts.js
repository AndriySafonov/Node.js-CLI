const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (parseError) {
    console.error('Error parsing contacts JSON:', parseError);
  }
};

const getContactById = async id => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  } catch (parseError) {
    console.error('Error parsing contacts JSON:', parseError);
  }
};

const addContact = async data => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (parseError) {
    console.error('Error parsing contacts JSON:', parseError);
  }
};

const updateById = async (id, data) => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (parseError) {
    console.error('Error parsing contacts JSON:', parseError);
  }
};

const removeContact = async id => {
  try {
    const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (parseError) {
    console.error('Error parsing contacts JSON:', parseError);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};
