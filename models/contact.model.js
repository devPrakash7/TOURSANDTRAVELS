
const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
  
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
    },
    mobile_number: {
        type: String,
    },
    descripation:{
        type:String
    },
    created_at:{
      type:String
    },
    updated_at:{
        type:String
    },
});



//Output data to JSON
contactSchema.methods.toJSON = function () {
    const contact = this;
    const contactObject = contact.toObject();
    return contactObject;
};


// Create the model for contacts
const Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;
