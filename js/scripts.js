// function AddressBook() {
//   this.contacts = {};
//   this.currentId = 0;
// }

// AddressBook.prototype.addContact = function(contact) {
//   contact.id = this.assignId();
//   this.contacts[contact.id] = contact;
// }

// AddressBook.prototype.assignId = function () {
//   this.currentId += 1;
//   return this.currentId;
// };

// AddressBook.prototype.findContact = function(id) {
//   if (this.contacts(id) !== undefined) {
//     return this.contacts[id];
//   }
//   return false;
// }

// AddressBook.prototype.deleteContact = function(id) {
//   if (this.contacts[id] === undefined) {
//     return false;
//   }
//   delete this.contacts[id];
//   return true; 
// }




function Contact([firstName, lastName, phoneNumber]) {
  this.firstName = firstName; 
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return (this.firstName + " " + this.lastName);
}

function showContacts(array) {
  const outputName = document.getElementById("name");
  const outputNumber = document.getElementById("phone-number");
  document.querySelector("p#name").innerText = outputName;
  document.querySelector("p#phone-number").innerText = outputNumber;
  array.forEach(function(element){
    outputName.innerText = "Name: " + element.firstName + " " + element.lastName;
    outputNumber.innerText = "Phone Number: "+ element.phoneNumber;
  })
}

//current bug - shows function instead of full name;

// User Inferface Logic

function handleSubmission(event){
  event.preventDefault();
  let contactArray = [];
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let contact = new Contact([firstName, lastName, phoneNumber])
  contactArray.push(contact);
  showContacts(contactArray);
}

window.addEventListener("load", function(){
  const form = document.getElementById("addressBook");
  form.addEventListener("submit", handleSubmission);
})