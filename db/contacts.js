const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

// Шлях до файлу з контактами
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
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
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
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
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
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
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

// // Функція для виведення списку контактів
// function listContacts() {
//   // Зчитуємо вміст файлу контактів
//   fs.readFile(contactsPath, 'utf8', (error, data) => {
//     if (error) {
//       console.error('Error reading contacts file:', error);
//       return;
//     }

//     try {
//       const contacts = JSON.parse(data); // Парсимо отримані дані в форматі JSON
//       console.log('Contacts:');
//       contacts.forEach(contact => {
//         console.log(`- Name: ${contact.name}`);
//         console.log(`  Email: ${contact.email}`);
//         console.log(`  Phone: ${contact.phone}`);
//         console.log('--------------------------------');
//       });
//     } catch (parseError) {
//       console.error('Error parsing contacts JSON:', parseError);
//     }
//   });
// }

// // Функція для отримання контакту за його ідентифікатором
// function getContactById(contactId) {
//   fs.readFile(contactsPath, 'utf8', (error, data) => {
//     if (error) {
//       console.error('Error reading contacts file:', error);
//       return;
//     }

//     try {
//       const contacts = JSON.parse(data);
//       const contact = contacts.find(c => c.id === contactId); // Знаходимо контакт за його ідентифікатором
//       if (contact) {
//         console.log('Contact found:');
//         console.log(`- Name: ${contact.name}`);
//         console.log(`  Email: ${contact.email}`);
//         console.log(`  Phone: ${contact.phone}`);
//       } else {
//         console.log('Contact not found.');
//       }
//     } catch (parseError) {
//       console.error('Error parsing contacts JSON:', parseError);
//     }
//   });
// }

// // Функція для видалення контакту за його ідентифікатором
// function removeContact(contactId) {
//   fs.readFile(contactsPath, 'utf8', (error, data) => {
//     if (error) {
//       console.error('Error reading contacts file:', error);
//       return;
//     }

//     try {
//       const contacts = JSON.parse(data);
//       const updatedContacts = contacts.filter(
//         contact => contact.id !== contactId
//       ); // Фільтруємо контакти, залишаючи тільки ті, які не мають заданий ідентифікатор
//       if (updatedContacts.length < contacts.length) {
//         fs.writeFile(
//           contactsPath,
//           JSON.stringify(updatedContacts, null, 2),
//           writeError => {
//             if (writeError) {
//               console.error(
//                 'Error writing contacts file:',
//                 writeError
//               );
//               return;
//             }
//             console.log('Contact removed successfully.');
//           }
//         );
//       } else {
//         console.log('Contact not found.');
//       }
//     } catch (parseError) {
//       console.error('Error parsing contacts JSON:', parseError);
//     }
//   });
// }

// // Функція для додавання нового контакту
// function addContact(name, email, phone) {
//   fs.readFile(contactsPath, 'utf8', (error, data) => {
//     if (error) {
//       console.error('Error reading contacts file:', error);
//       return;
//     }

//     try {
//       const contacts = JSON.parse(data);
//       const existingContact = contacts.find(
//         contact => contact.email === email
//       );

//       if (existingContact) {
//         console.log(
//           'Contact with the same email already exists. Skipping addition.'
//         );
//         return;
//       }

//       const newContact = {
//         id: generateUniqueId(),
//         name,
//         email,
//         phone,
//       };
//       const updatedContacts = [...contacts, newContact];

//       fs.writeFile(
//         contactsPath,
//         JSON.stringify(updatedContacts, null, 2),
//         writeError => {
//           if (writeError) {
//             console.error('Error writing contacts file:', writeError);
//             return;
//           }
//           console.log('Contact added successfully.');
//         }
//       );
//     } catch (parseError) {
//       console.error('Error parsing contacts JSON:', parseError);
//     }
//   });
// }

// // Функція для генерації унікального ідентифікатора
// function generateUniqueId() {
//   return Math.random().toString(36).substr(2, 9); // Генеруємо випадковий рядок довжиною 9 символів
// }

// // Експортуємо функції для використання в інших модулях
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
