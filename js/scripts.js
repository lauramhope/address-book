// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};


// User Interface Logic ---------
let addressBook = new AddressBook(); // new AddressBook object named "addressBook" - global variable

// this function is specific to handle displaying contacts in the DOM
// contactsDiv = variable that will contain our contacts
// contactsDiv.innerText = null = clears the inner text and clears the list of contacts BEFORE populating it -- needs this because our code lops through ALL contacts and print each one, not just the newly added contacts - this ensures the user can submit the form to create a new contact over and over w/o creating duplicate contacts
// create empty UL element - each iteration of the loop will add new list items
// object.keys gets all keys/properties from the addressBookToDisplay.contacts  to iterate through them - object keys returns an array, so we can call any array method on the returned value
// use forEach loop to loop through the object keys
// the loop does this: grabs a contact object via AddressBook.prototype.findContact() method, creates a new list item element for that contact (add an id attribute that is equal to the contact's id property), then add the new list item to the unordered list
// after loop is finished and UL is populated, DOM is updated via appending the UL to the contactsDiv element
// VERY IMPORTANT - each contact list item is being created w/ an Id attribute matching the Contact's id property - can use to find contact later via AddressBook.prototype.findContact() method to locate entire contact object
function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul); // this only updates the DOM a single time w/ the populated list of contacts -- much more efficient
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}
// event parameter = access the event object that is passed into the function when the click event is triggered
// event.target represents the element that the event originated from (li element in this case)

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
}
// handleFormSubmission function -- called in the load event listener - this function prevents default refreshing of page, gathers user input from the form fields for name and number and assigned them to the variables, creates a new contact object, passes in the gathered info as arguments, and saves the new contact object in the variable newContact, adds the new contact to our addressbook via the AddressBook.prototype.addContact method, and logs the list of contacts in our addressbook to the console

function handleDelete(event){
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

window.addEventListener("load", function (){
  const form = document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});
// callback function passed into this will be called when the webpage has loaded all resources and is ready to go
// event listener for form submission event - when form is submitted, handleFormSubmission function will be called
// attached an event listener to the contacts div -- listens for click events on the div, including anything inside of it (UL and LI elements)








// OLD CODE

// function Contact([firstName, lastName, phoneNumber]) {
//   this.firstName = firstName; 
//   this.lastName = lastName;
//   this.phoneNumber = phoneNumber;
// }

// Contact.prototype.fullName = function () {
//   return (this.firstName + " " + this.lastName);
// }

// function showContacts(array) {
//   const outputName = document.getElementById("name");
//   const outputNumber = document.getElementById("phone-number");
//   document.querySelector("p#name").innerText = outputName;
//   document.querySelector("p#phone-number").innerText = outputNumber;
//   array.forEach(function(element){
//     outputName.innerText = "Name: " + element.firstName + " " + element.lastName;
//     outputNumber.innerText = "Phone Number: "+ element.phoneNumber;
//   })
// }

// //current bug - shows function instead of full name;

// // User Inferface Logic

// function handleSubmission(event){
//   event.preventDefault();
//   let contactArray = [];
//   let firstName = document.getElementById("firstName").value;
//   let lastName = document.getElementById("lastName").value;
//   let phoneNumber = document.getElementById("phoneNumber").value;
//   let contact = new Contact([firstName, lastName, phoneNumber])
//   contactArray.push(contact);
//   showContacts(contactArray);
// }

// window.addEventListener("load", function(){
//   const form = document.getElementById("addressBook");
//   form.addEventListener("submit", handleSubmission);
// })