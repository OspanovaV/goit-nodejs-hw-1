const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

const listContacts = async () => {  
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);  
}

const getContactById = async(contactId) => {   
        const contacts = await listContacts();
        const contact = contacts.find(({ id }) => id === contactId.toString());
        return contact || null;     
}

const addContact = async(name, email, phone) => {  
  if (!name || !email || !phone) {
    return `Fill in the required parameters: name, email, phone`;
  }
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }
    
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;  
}

const removeContact = async(contactId)=> { 
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
      return id === contactId.toString();
    });
    if (index === -1) {
      return null;
    }
    const [removedContacts] = contacts.splice(index, 1);  
    await fs.writeFile(contactsPath, JSON.stringify(contacts,null, 2));
    return removedContacts;
  
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,  
}