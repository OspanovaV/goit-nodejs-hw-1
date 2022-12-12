// const yargs = require('yargs');
// const { hideBin } = require('yargs/helpers');

const argv = require("yargs").argv;

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts");

const  invokeAction = async ({ action, id, name, email, phone })=> {
  switch (action) {
    case "list":     
        const response = await listContacts();
        console.table("ListContacts:", response);      
      break;

    case "get":      
        const getcontact = await getContactById(id);
        contact
          ? console.table(`Contact with id "${id}": `, getcontact)
          : console.log(`"Contact with id "${id}": not found"`);      
      break;

    case "add":     
        const addNewContact = await addContact(name, email, phone);
        console.table(`Result: `, addNewContact);      
      break;

    case "remove":     
        const deleteContact = await removeContact(id);
        deleteContact
          ? console.table(deleteContact)
          : console.log(`"Contact with id "${id}": not found"`);     
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);