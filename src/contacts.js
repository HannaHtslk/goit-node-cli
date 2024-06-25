import fs from 'fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const contactsPath = path.join(rootDir, 'src', 'db', 'contacts.json');

// console.log(contactsPath);

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  return contacts.find((contact) => contact.id === contactId || null);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId,
  );
  if (contactIndex === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
  console.log(contacts);
  return newContact;
}

export { listContacts, getContactById, addContact, removeContact };
